// page.tsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface AlertState {
  type: "error" | "success" | null;
  message: string;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState("google/gemma-3-1b");
  const [mode, setMode] = useState("general");
  const [output, setOutput] = useState("txt");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [downloadPath, setDownloadPath] = useState("");
  const [isDocx, setIsDocx] = useState(false);
  const [alert, setAlert] = useState<AlertState>({ type: null, message: "" });
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window === "undefined") return false;
    const isTauri = "__TAURI_INTERNALS__" in window;
    if (isTauri) return false;
    const hasSeenOnboarding = window.localStorage.getItem(
      "vidintel_onboarding_seen",
    );
    return !hasSeenOnboarding;
  });

  function handleOnboardingContinue() {
    localStorage.setItem("vidintel_onboarding_seen", "true");
    setShowOnboarding(false);
  }

  const showAlert = (type: "error" | "success", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: null, message: "" }), 4000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files?.length > 0) {
      const droppedFile = files[0];
      if (droppedFile.type.startsWith("video/")) {
        setFile(droppedFile);
      } else {
        showAlert("error", "Please upload a video file");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showAlert("success", "Copied to clipboard!");
    } catch (err) {
      showAlert("error", "Failed to copy to clipboard");
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      showAlert("error", "Please select a video file to process");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", model);
    formData.append("mode", mode);
    formData.append("output", output);

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        showAlert("error", data.error);
      } else {
        setResult(data.summary);
        setDownloadPath(data.filePath);
        setIsDocx(data.isDocx);
        showAlert("success", "Video processed successfully!");
      }
    } catch (err) {
      showAlert("error", "Failed to process video. Please try again.");
    }

    setLoading(false);
  };

  async function handleDownload(fileName: string) {
    const isTauri =
      typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

    if (isTauri) {
      try {
        const response = await fetch(
          `/api/download?path=${encodeURIComponent(fileName)}`,
        );

        const blob = await response.blob();

        const save = (window as any).__TAURI__?.dialog?.save;
        const writeFile = (window as any).__TAURI__?.fs?.writeFile;

        const filePath = await save({
          defaultPath: fileName.split("/").pop(),
        });

        if (filePath) {
          const buffer = await blob.arrayBuffer();
          await writeFile({
            path: filePath,
            contents: new Uint8Array(buffer),
          });
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      window.location.href = `/api/download?path=${encodeURIComponent(fileName)}`;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      {/* Alert */}
      {alert.type && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            alert.type === "error"
              ? "bg-red-900/20 border border-red-500/30 text-red-200"
              : "bg-emerald-900/20 border border-emerald-500/30 text-emerald-200"
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* Onboarding Modal */}

      {showOnboarding && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full">
            {/* Modal Content */}
            <div className="p-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  ⚠️ Setup Required (One-Time)
                </h2>
                <p className="text-slate-400">
                  This application runs completely on your local machine to
                  ensure privacy.
                </p>
              </div>

              {/* Setup Instructions */}
              <div className="mb-8 space-y-4">
                <p className="text-slate-300 font-semibold">
                  Before using, make sure you have completed the following
                  steps:
                </p>

                <ol className="space-y-3 text-slate-300">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-600/30 border border-blue-500/50 text-sm font-semibold text-blue-300">
                      1
                    </span>
                    <span>
                      Install FFmpeg and ensure it is added to system PATH
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-600/30 border border-blue-500/50 text-sm font-semibold text-blue-300">
                      2
                    </span>
                    <span>Install LM Studio</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-600/30 border border-blue-500/50 text-sm font-semibold text-blue-300">
                      3
                    </span>
                    <span>
                      Download and load a model (e.g., google/gemma-3-1b)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-600/30 border border-blue-500/50 text-sm font-semibold text-blue-300">
                      4
                    </span>
                    <span>
                      Start LM Studio local server (http://localhost:1234)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-600/30 border border-blue-500/50 text-sm font-semibold text-blue-300">
                      5
                    </span>
                    <span>
                      Install Python dependencies (pip install -r
                      requirements.txt)
                    </span>
                  </li>
                </ol>
              </div>

              {/* Info Box */}
              <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-4 mb-8">
                <p className="text-emerald-200 text-sm">
                  Once all steps are complete, you can upload videos and process
                  them locally.
                </p>
              </div>

              {/* Continue Button */}
              <button
                onClick={handleOnboardingContinue}
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-block">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold">VI</span>
              </div>
            </div>
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-600/50 hover:border-slate-500/50 rounded-lg transition-all duration-200"
            >
              About
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white">
            VidIntel
          </h1>
          <p className="text-slate-400 text-lg">
            Offline video analysis and transcription powered by AI. Process
            videos with local LLM models, get intelligent summaries in multiple
            formats, keeping your data private and secure.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-8">
          {/* Upload Section */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Upload Video
            </h2>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-blue-500/60 bg-blue-500/5"
                  : "border-slate-600/50 hover:border-slate-500/50 bg-slate-900/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="cursor-pointer w-full outline-none"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 mb-3 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-slate-300 font-medium mb-1">
                    Drop your video here or click to browse
                  </p>
                  <p className="text-sm text-slate-500">
                    Supported formats: MP4, WebM, Ogg, and more
                  </p>
                </div>
              </button>
            </div>

            {/* File Preview */}
            {file && (
              <div className="mt-4 p-4 bg-slate-900/50 border border-slate-700/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <svg
                    className="w-6 h-6 text-cyan-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-100 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  disabled={loading}
                  className="ml-4 px-3 py-1 text-sm rounded-md bg-slate-700/50 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-50"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Configuration Section */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-6 text-white">
              Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Model Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  AI Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent hover:border-slate-500 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <option value="google/gemma-3-1b">Gemma 1B</option>
                  <option value="qwen/qwen3-vl-4b">Qwen 4B</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  Choose the model for analysis
                </p>
              </div>

              {/* Mode Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Processing Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent hover:border-slate-500 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <option value="general">General</option>
                  <option value="meeting">Meeting</option>
                  <option value="interview">Interview</option>
                  <option value="report">Report</option>
                  <option value="lecture">Lecture</option>
                  <option value="keypoints">Key Points</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  Tailor analysis to content type
                </p>
              </div>

              {/* Output Format */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Output Format
                </label>
                <select
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent hover:border-slate-500 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <option value="txt">TXT</option>
                  <option value="docx">DOCX</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  Format for download
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !file}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
              loading || !file
                ? "bg-slate-700/50 cursor-not-allowed opacity-50"
                : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-blue-500/25"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing video...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Process Video
              </>
            )}
          </button>

          {/* Results Section */}
          {(result || downloadPath) && (
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Results</h2>
                {result && (
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      copied
                        ? "bg-emerald-600/20 text-emerald-200 border border-emerald-500/30"
                        : "bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600/50"
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                )}
              </div>

              {result && (
                <div className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-6 max-h-80 overflow-y-auto mb-6">
                  <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap break-words leading-relaxed">
                    {result}
                  </pre>
                </div>
              )}

              {!result && (
                <div className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-6 mb-6">
                  <p className="text-slate-300 text-sm">
                    Video processed successfully! Your file is ready to
                    download.
                  </p>
                </div>
              )}

              {/* Download Button */}
              {downloadPath && (
                <div>
                  <button
                    onClick={() => handleDownload(downloadPath)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg text-emerald-200 font-medium transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download {isDocx ? "DOCX" : "TXT"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!result && !downloadPath && !loading && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto text-slate-600 mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-slate-400">
                Upload a video and configure settings to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
