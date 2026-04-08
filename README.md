# VidIntel 🎬🧠 - "Turn videos into insights — privately."

VidIntel is a privacy-first, offline video intelligence tool that transforms video content into structured insights using local AI models.

It goes beyond basic summarization by enabling:

- 📊 Structured reports
- 🧑‍💼 Meeting summaries with action items
- 🎯 Interview question generation from tutorials and lectures
- 📚 Lecture and learning notes extraction
- ⚡ Key insights and bullet-point summaries

All processing happens locally on your machine — your videos, transcripts, and data are never uploaded to external servers.

## 🔐 Privacy First

VidIntel is designed with privacy as a core principle.

- ✅ No data is sent to external APIs
- ✅ All processing happens locally using tools like Whisper and LM Studio
- ✅ Your video files and transcripts never leave your system
- ✅ No tracking, no telemetry

This makes VidIntel ideal for:

- Sensitive business meetings
- Confidential reports
- Personal learning content

## Features

- Offline transcription (Whisper)
- Local LLM summarization (LM Studio)
- Multiple modes (meeting, interview, report, etc.)
- Interactive CLI
- Output formats: txt, docx

## Run (CLI)

- cd cli
- python main.py --interactive

## 🔧 Prerequisites

- Python 3.9+
- FFmpeg installed and added to PATH

Verify:

````bash
ffmpeg -version

## ✅ LM Studio setup (VERY IMPORTANT)

Users must:
- Install LM Studio
- Load a model
- Start server

Add:

```md
## 🤖 Local AI Setup (LM Studio)

1. Install LM Studio
2. Download a model (e.g., google/gemma-3-1b)
3. Start the local server (default: http://localhost:1234)

Verify:
http://localhost:1234/v1/models
````

## Setup

Install dependencies

## 📦 Installation

```bash
pip install -r requirements.txt
```

## ▶️ Run

```bash
cd cli
python main.py --interactive

Or:

python main.py video.mp4 --mode meeting
```
