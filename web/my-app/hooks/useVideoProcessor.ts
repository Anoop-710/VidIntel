"use client";

import { useState } from "react";
import { AlertState, VideoProcessResult } from "../types/types";

export function useVideoProcessor() {
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

  const showAlert = (type: "error" | "success", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: null, message: "" }), 4000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showAlert("success", "Copied to clipboard!");
    } catch {
      showAlert("error", "Failed to copy to clipboard");
    }
  };

  const handleSubmit = async () => {
    if (!file)
      return showAlert("error", "Please select a video file to process");

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
      const data: VideoProcessResult & { error?: string } = await res.json();

      if (data.error) {
        showAlert("error", data.error);
      } else {
        setResult(data.summary);
        setDownloadPath(data.filePath);
        setIsDocx(data.isDocx);
        showAlert("success", "Video processed successfully!");
      }
    } catch {
      showAlert("error", "Failed to process video. Please try again.");
    }

    setLoading(false);
  };

  return {
    file,
    setFile,
    model,
    setModel,
    mode,
    setMode,
    output,
    setOutput,
    loading,
    result,
    downloadPath,
    isDocx,
    alert,
    copied,
    copyToClipboard,
    handleSubmit,
  };
}
