import argparse
import os
import hashlib
import questionary

from vid.cli.audio import extract_audio
from vid.cli.transcribe import transcribe_audio
from vid.cli.summarize import summarize_text
from vid.cli.utils import get_cache_filename, save_output, split_text


def get_cache_filename(video_path):
    # create unique hash for file path
    file_hash = hashlib.md5(video_path.encode()).hexdigest()
    return f"cache_{file_hash}.txt"


def save_output(summary, filename="output.txt"):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(summary)

    print(f"\nSaved summary to {filename}")



def interactive_setup():
    print("\nWelcome to VidSage Interactive Mode\n")

    video_path = questionary.text("Enter video file path:").ask()

    model = questionary.select(
        "Choose model:",
        choices=[
            "google/gemma-3-1b",
            "qwen/qwen3-vl-4b",
            "custom"
        ]
    ).ask()

    if model == "custom":
        model = questionary.text("Enter custom model name:").ask()

    mode = questionary.select(
        "Choose summary mode:",
            choices = [
            "general",
            "meeting",
            "interview",
            "report",
            "lecture",
            "keypoints"
            ]
    ).ask()

    output_format = questionary.select(
        "Choose output format:",
        choices=["txt", "docx"]
    ).ask()

    output_file = f"output.{output_format}"

    return {
        "video": video_path,
        "model": model,
        "mode": mode,
        "output": output_file
    }


def main():
    parser = argparse.ArgumentParser(description="VidSage - Offline Video Summarizer")

    parser.add_argument("video", nargs="?", help="Path to video file") 
    parser.add_argument("--model", default="google/gemma-3-1b", help="Model name")
    parser.add_argument("--mode", default="general", help="Summary mode")
    parser.add_argument("--output", default="output.txt", help="Output file name")
    parser.add_argument("--no-transcript", action="store_true", help="Hide transcription output")
    parser.add_argument("--interactive", action="store_true", help="Run in interactive mode")

    args = parser.parse_args()

    # INTERACTIVE MODE
    if args.interactive:

        config = interactive_setup()

        video_path = config["video"]
        model = config["model"]
        mode = config["mode"]
        output_file = config["output"]

        no_transcript = False  # default behavior in interactive

    else:
        # CLI MODE
        if not args.video:
            print(" Please provide a video file or use --interactive")
            return

        video_path = args.video
        model = args.model
        mode = args.mode
        output_file = args.output
        no_transcript = args.no_transcript

    # Validate file
    if not os.path.exists(video_path):
        print(" File not found!")
        return

    print(f" Video file detected: {video_path}")

    # Extract audio
    print(" Extracting audio...")
    audio_file = extract_audio(video_path)
    print(f" Audio saved as: {audio_file}")

    # Cache handling
    cache_file = get_cache_filename(video_path)

    if os.path.exists(cache_file):
        print("Using cached transcript...")
        with open(cache_file, "r", encoding="utf-8") as f:
            transcript = f.read()
    else:
        transcript = transcribe_audio(audio_file)
        with open(cache_file, "w", encoding="utf-8") as f:
            f.write(transcript)

    # Optional transcript display
    if not no_transcript:
        print("\n Transcription:\n")
        print(transcript)

    # 🧠 Summarization
    print(f"🤖 Using model: {model}")
    print(f"📝 Using mode: {mode}")

    chunks = split_text(transcript)
    all_summaries = []

    for i, chunk in enumerate(chunks):
        print(f"\n🧩 Processing chunk {i+1}/{len(chunks)}...")

        chunk_summary = summarize_text(chunk, model, mode)
        all_summaries.append(chunk_summary)

    # 🔗 Combine summaries
    combined_summary = "\n\n".join(all_summaries)

    # 🧠 Final summarization
    print("\n🧠 Generating final summary...")
    final_summary = summarize_text(combined_summary, model, mode)

    # 📌 Output
    print("\n📌 Final Summary:\n")
    print(final_summary)

    # 💾 Save
    save_output(final_summary, output_file)

if __name__ == "__main__":
    main()

