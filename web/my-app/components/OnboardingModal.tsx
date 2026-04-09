export function OnboardingModal({ onContinue }: { onContinue: () => void }) {
  const steps = [
    "Install FFmpeg and ensure it is added to system PATH",
    "Install LM Studio",
    "Download and load a model (e.g., google/gemma-3-1b)",
    "Start LM Studio local server (http://localhost:1234)",
    "Install Python dependencies (pip install -r requirements.txt)",
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          ⚠️ Setup Required (One-Time)
        </h2>
        <p className="text-slate-400 mb-6">
          This application runs completely on your local machine to ensure
          privacy.
        </p>
        <ol className="space-y-3 text-slate-300 mb-8">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-600/30 border border-blue-500/50 text-sm font-semibold text-blue-300">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-4 mb-8">
          <p className="text-emerald-200 text-sm">
            Once all steps are complete, you can upload videos and process them
            locally.
          </p>
        </div>
        <button
          onClick={onContinue}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
