# VidIntel 🎬🧠 - "Turn videos into insights — privately."

VidIntel is a privacy-first, offline video intelligence tool that transforms video content into structured insights using local AI models.

It goes beyond basic summarization by enabling:

- 📊 Structured reports
- 🧑‍💼 Meeting summaries with action items
- 🎯 Interview question generation from tutorials and lectures
- 📚 Lecture and learning notes extraction
- ⚡ Key insights and bullet-point summaries

All processing happens locally on your machine — your videos, transcripts, and data are never uploaded to external servers.

## Features

- Offline transcription (Whisper)
- Local LLM summarization (LM Studio)
- Multiple modes (meeting, interview, report, etc.)
- Interactive CLI
- Output formats: txt, docx

## Setup

```bash
pip install -r requirements.txt
```

## Run (CLI)

cd cli
python main.py --interactive

## Requirements

FFmpeg installed
LM Studio running (localhost:1234)
