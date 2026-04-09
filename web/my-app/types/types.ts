export interface AlertState {
  type: "error" | "success" | null;
  message: string;
}

export interface VideoProcessResult {
  summary: string;
  filePath: string;
  isDocx: boolean;
}
