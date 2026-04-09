// about/page.tsx
"use client";

import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        {/* Header with Back Navigation */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-slate-300 hover:text-white border border-slate-600/50 hover:border-slate-500/50 rounded-lg transition-all duration-200"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white">
            About VidIntel
          </h1>
          <p className="text-slate-400 text-lg">
            Learn more about our privacy-first video intelligence platform
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Main Description */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              <span className="font-semibold text-white">
                Turn videos into insights — privately.
              </span>
            </p>
            <p className="text-slate-400">
              VidIntel is a privacy-first, offline video intelligence tool that
              transforms video content into structured insights using local AI
              models. It goes beyond basic summarization by enabling structured
              reports, meeting summaries with action items, interview question
              generation, and key insights extraction.
            </p>
          </div>

          {/* Privacy Section */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 9l3.293 3.293a1 1 0 11-1.414 1.414l-4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Privacy First
            </h3>
            <p className="text-slate-400 mb-4">
              VidIntel is designed with privacy as a core principle. All
              processing happens locally on your machine — your videos,
              transcripts, and data are never uploaded to external servers.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-slate-300">
                <svg
                  className="w-5 h-5 text-emerald-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                No data is sent to external APIs
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <svg
                  className="w-5 h-5 text-emerald-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                All processing happens locally
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <svg
                  className="w-5 h-5 text-emerald-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Your video files and transcripts never leave your system
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <svg
                  className="w-5 h-5 text-emerald-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                No tracking, no telemetry
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-cyan-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 000-2H7zM4 7a1 1 0 011-1h10a1 1 0 011 1v6a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" />
              </svg>
              Ideal For
            </h3>
            <p className="text-slate-400 mb-4">
              Perfect for scenarios where privacy and data security are
              paramount:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-1">→</span>
                <span className="text-slate-300">
                  Sensitive business meetings
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-1">→</span>
                <span className="text-slate-300">Confidential reports</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-1">→</span>
                <span className="text-slate-300">
                  Personal learning content
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold mt-1">→</span>
                <span className="text-slate-300">Interview preparation</span>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2a1 1 0 001 1h14a1 1 0 001-1V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-cyan-400">📊</span>
                  Structured Reports
                </h4>
                <p className="text-sm text-slate-400">
                  Generate professional reports from video content with
                  organized insights
                </p>
              </div>
              <div className="bg-slate-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-cyan-400">🧑‍💼</span>
                  Meeting Summaries
                </h4>
                <p className="text-sm text-slate-400">
                  Extract action items and key decisions from business meetings
                </p>
              </div>
              <div className="bg-slate-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-cyan-400">🎯</span>
                  Interview Prep
                </h4>
                <p className="text-sm text-slate-400">
                  Generate interview questions from tutorials and learning
                  content
                </p>
              </div>
              <div className="bg-slate-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-cyan-400">📚</span>
                  Learning Notes
                </h4>
                <p className="text-sm text-slate-400">
                  Extract lecture and learning notes in an organized format
                </p>
              </div>
              <div className="bg-slate-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-cyan-400">⚡</span>
                  Key Insights
                </h4>
                <p className="text-sm text-slate-400">
                  Get bullet-point summaries with the most important information
                </p>
              </div>
              <div className="bg-slate-900/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-cyan-400">💾</span>
                  Multiple Formats
                </h4>
                <p className="text-sm text-slate-400">
                  Download results in TXT or DOCX format for easy sharing
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to get started?
            </h3>
            <p className="text-slate-300 mb-6">
              Start processing your videos with VidIntel today
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
