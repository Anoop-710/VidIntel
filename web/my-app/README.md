# 🌐 VidIntel Web (Local)

VidIntel Web is a **privacy-first local web interface** for processing videos using AI.

Unlike typical AI tools, **your data never leaves your machine**.

---

## 🔐 Key Features

- 🎥 Upload local videos
- 🧠 Transcribe using Whisper (offline)
- 🤖 Summarize using local LLMs (via LM Studio)
- 📄 Generate:
  - Meeting summaries
  - Interview questions
  - Reports
  - Key insights
- 💾 Export as `.txt` or `.docx`

---

## 🛡️ Privacy First

VidIntel runs entirely on your system:

- No cloud processing
- No API calls to external LLMs
- No data logging

All processing happens locally using:

- Whisper
- FFmpeg
- LM Studio

---

## ⚙️ Prerequisites

Before running the web app, ensure:

### 1. Install Python Dependencies

From project root:

```bash
pip install -r requirements.txt

2. Install FFmpeg
Download from: https://ffmpeg.org/download.html
Add to system PATH

Verify:

ffmpeg -version

3. Install LM Studio
Download from: https://lmstudio.ai/
Open app
Download a model:
google/gemma-3-1b (recommended)
qwen/qwen3-vl-4b
Start local server

Verify:

http://localhost:1234/v1/models
🚀 Run the Web App
cd web/my-app
npm install
npm run dev

Open browser:

http://localhost:3000
🧠 How It Works
Upload Video
   ↓
Next.js API
   ↓
Python CLI
   ↓
Whisper (Transcription)
   ↓
LM Studio (Summarization)
   ↓
Result in Browser
⚠️ Notes
Max recommended video size: 100–200 MB
Ensure LM Studio is running before processing
First run may take longer due to model loading
🛠️ Troubleshooting
❌ "File not found"
Use absolute file path OR ensure file is uploaded correctly
❌ LM Studio error
Ensure model is loaded
Ensure server is running
❌ FFmpeg not found
Ensure FFmpeg is installed and added to PATH
🎯 Goal
```

## Web Version
