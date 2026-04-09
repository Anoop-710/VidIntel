# VidIntel 🎬🧠

### Turn videos into insights — privately.

VidIntel is a **privacy-first, offline video intelligence tool** that transforms video content into structured insights using local AI models.

Unlike typical AI tools, **your data never leaves your machine**.

---

## 🔐 Privacy First

VidIntel is designed with privacy as a core principle:

- ✅ No data is sent to external APIs
- ✅ All processing happens locally
- ✅ No tracking, no telemetry
- ✅ Your videos and transcripts never leave your system

**Powered by:**

- Whisper (transcription)
- FFmpeg (audio extraction)
- LM Studio (local LLM inference)

---

## ✨ What Can You Do?

VidIntel goes beyond basic summarization:

- 📊 Structured reports
- 🧑‍💼 Meeting summaries (with action items)
- 🎯 Interview question generation (from tutorials/lectures)
- ⚡ Key insights & bullet summaries

---

## 🧩 Project Structure

```
vidintel/
├── core/       # Shared logic (audio, transcription, summarization)
├── cli/        # CLI tool
├── web/        # Local web interface (Next.js)
└── README.md
```

---

# 🚀 Getting Started

## 🔧 Prerequisites

### 1. Python

- Python 3.9+

### 2. Install FFmpeg

Download: https://ffmpeg.org/download.html

Add to system PATH

Verify:

```bash
ffmpeg -version
```

### 3. Setup Local AI (LM Studio)

1. Install LM Studio from https://lmstudio.ai/
2. Download a model:
   - `google/gemma-3-1b` (recommended)
   - `qwen/qwen3-vl-4b`
3. Start local server

Verify:

```bash
http://localhost:1234/v1/models
```

---

## 📦 Install Dependencies

From project root:

```bash
pip install -r requirements.txt
```

---

## 🖥️ Option 1: CLI Usage

### ▶️ Run Interactive Mode

```bash
cd cli
python main.py --interactive
```

### ▶️ Run Direct Command

```bash
python main.py video.mp4 --mode meeting
```

### 📄 Output Formats

- `.txt`
- `.docx`

---

## 🌐 Option 2: Web UI (Local)

VidIntel also includes a local web interface for a more user-friendly experience.

👉 **No cloud involved** — runs entirely on your machine.

### ▶️ Run Web App

```bash
cd web/my-app
npm install
npm run dev
```

Open in browser:

```
http://localhost:3000
```

### 🧠 How Web Version Works

```
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
```

---

## ⚠️ Notes

- Recommended video size: 100–200 MB
- Ensure LM Studio is running before processing
- First run may be slower (model load time)

---

## 🛠️ Troubleshooting

### ❌ FFmpeg not found

- Ensure it is installed and added to PATH

### ❌ LM Studio error

- Ensure model is loaded
- Ensure server is running

### ❌ File not found

- Use correct/absolute path (CLI)
- Ensure upload works (Web)

---

## 🎯 Use Cases

VidIntel is ideal for:

- Business meetings
- Technical tutorials
- Interview preparation
- Research & learning
- Content analysis

---

## 🧭 Roadmap

- 🖥️ Desktop app (one-click experience)
- ⚡ Faster processing optimizations
- 🎨 Improved UI/UX

---

## 🛡️ Why VidIntel?

**Most AI tools:**

Upload → Process → Store → Risk ❌

**VidIntel:**

Process locally → Stay private ✅

---

## ⭐ Final Note

VidIntel is built for users who care about:

- Privacy
- Control
- Local AI workflows

If you find this useful, consider giving it a ⭐
