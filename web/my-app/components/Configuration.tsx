interface Props {
  model: string;
  onModelChange: (v: string) => void;
  mode: string;
  onModeChange: (v: string) => void;
  output: string;
  onOutputChange: (v: string) => void;
  disabled: boolean;
}

const selectClass =
  "w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent hover:border-slate-500 transition-all disabled:opacity-50 cursor-pointer";

export function Configuration({
  model,
  onModelChange,
  mode,
  onModeChange,
  output,
  onOutputChange,
  disabled,
}: Props) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-6 text-white">Configuration</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            AI Model
          </label>
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            disabled={disabled}
            className={selectClass}
          >
            <option value="google/gemma-3-1b">Gemma 1B</option>
            <option value="qwen/qwen3-vl-4b">Qwen 4B</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">
            Choose the model for analysis
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Processing Mode
          </label>
          <select
            value={mode}
            onChange={(e) => onModeChange(e.target.value)}
            disabled={disabled}
            className={selectClass}
          >
            {[
              "general",
              "meeting",
              "interview",
              "report",
              "lecture",
              "keypoints",
            ].map((m) => (
              <option key={m} value={m}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-1">
            Tailor analysis to content type
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Output Format
          </label>
          <select
            value={output}
            onChange={(e) => onOutputChange(e.target.value)}
            disabled={disabled}
            className={selectClass}
          >
            <option value="txt">TXT</option>
            <option value="docx">DOCX</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Format for download</p>
        </div>
      </div>
    </div>
  );
}
