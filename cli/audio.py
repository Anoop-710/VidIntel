import subprocess

def extract_audio(video_path):
    audio_path = "temp.wav"

    command = [
        "ffmpeg",
        "-i", video_path,
        "-vn",
        "-acodec", "pcm_s16le",
        audio_path
    ]

    subprocess.run(command)

    return audio_path