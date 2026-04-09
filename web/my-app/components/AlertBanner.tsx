import { AlertState } from "@/types/types";

export function AlertBanner({ alert }: { alert: AlertState }) {
  if (!alert.type) return null;
  return (
    <div
      className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        alert.type === "error"
          ? "bg-red-900/20 border border-red-500/30 text-red-200"
          : "bg-emerald-900/20 border border-emerald-500/30 text-emerald-200"
      }`}
    >
      {alert.message}
    </div>
  );
}
