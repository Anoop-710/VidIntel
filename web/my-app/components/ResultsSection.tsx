import { handleDownload } from "@/lib/download";

interface Props {
  result: string;
  downloadPath: string;
  isDocx: boolean;
  copied: boolean;
  onCopy: () => void;
}

export function ResultsSection({
  result,
  downloadPath,
  isDocx,
  copied,
  onCopy,
}: Props) {
  if (!result && !downloadPath) return null;
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Results</h2>
        {result && (
          <button
            onClick={onCopy}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              copied
                ? "bg-emerald-600/20 text-emerald-200 border border-emerald-500/30"
                : "bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600/50"
            }`}
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        )}
      </div>
      {result ? (
        <div className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-6 max-h-80 overflow-y-auto mb-6">
          <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap break-words leading-relaxed">
            {result}
          </pre>
        </div>
      ) : (
        <div className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-6 mb-6">
          <p className="text-slate-300 text-sm">
            Video processed successfully! Your file is ready to download.
          </p>
        </div>
      )}
      {downloadPath && (
        <button
          onClick={() => handleDownload(downloadPath)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg text-emerald-200 font-medium transition-all duration-200"
        >
          ↓ Download {isDocx ? "DOCX" : "TXT"}
        </button>
      )}
    </div>
  );
}
