"use client";

import { useState } from "react";
import Link from "next/link";
import { useVideoProcessor } from "@/hooks/useVideoProcessor";
import { AlertBanner } from "@/components/AlertBanner";
import { OnboardingModal } from "@/components/OnboardingModal";
import { VideoUpload } from "@/components/VideoUpload";
import { Configuration } from "@/components/Configuration";
import { ResultsSection } from "@/components/ResultsSection";

export default function Home() {
  const processor = useVideoProcessor();
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window === "undefined") return false;
    if ("__TAURI_INTERNALS__" in window) return false;
    return !window.localStorage.getItem("vidintel_onboarding_seen");
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      <AlertBanner alert={processor.alert} />
      {showOnboarding && (
        <OnboardingModal
          onContinue={() => {
            localStorage.setItem("vidintel_onboarding_seen", "true");
            setShowOnboarding(false);
          }}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold">VI</span>
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

        <div className="space-y-8">
          <VideoUpload
            file={processor.file}
            onFileChange={processor.setFile}
            onError={(msg) => processor?.showAlert?.("error", msg)}
            disabled={processor.loading}
          />
          <Configuration
            model={processor.model}
            onModelChange={processor.setModel}
            mode={processor.mode}
            onModeChange={processor.setMode}
            output={processor.output}
            onOutputChange={processor.setOutput}
            disabled={processor.loading}
          />
          <button
            onClick={processor.handleSubmit}
            disabled={processor.loading || !processor.file}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
              processor.loading || !processor.file
                ? "bg-slate-700/50 cursor-not-allowed opacity-50"
                : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
            }`}
          >
            {processor.loading ? "Processing video..." : "Process Video"}
          </button>
          <ResultsSection
            result={processor.result}
            downloadPath={processor.downloadPath}
            isDocx={processor.isDocx}
            copied={processor.copied}
            onCopy={processor.copyToClipboard}
          />
        </div>
      </div>
    </div>
  );
}
