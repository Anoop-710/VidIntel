import { useRef, useState } from "react";
import { formatFileSize } from "@/lib/format";

interface Props {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onError: (msg: string) => void;
  disabled: boolean;
}

export function VideoUpload({ file, onFileChange, onError, disabled }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type.startsWith("video/")) {
      onFileChange(dropped);
    } else {
      onError("Please upload a video file");
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4 text-white">Upload Video</h2>
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
          onChange={(e) =>
            e.target.files?.[0] && onFileChange(e.target.files[0])
          }
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="cursor-pointer w-full outline-none"
        >
          <div className="flex flex-col items-center justify-center">
            {/* upload icon */}
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
            onClick={() => onFileChange(null)}
            disabled={disabled}
            className="ml-4 px-3 py-1 text-sm rounded-md bg-slate-700/50 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
