export async function handleDownload(fileName: string) {
  const isTauri =
    typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

  if (isTauri) {
    const response = await fetch(
      `/api/download?path=${encodeURIComponent(fileName)}`,
    );
    const blob = await response.blob();
    const save = (window as any).__TAURI__?.dialog?.save;
    const writeFile = (window as any).__TAURI__?.fs?.writeFile;
    const filePath = await save({ defaultPath: fileName.split("/").pop() });
    if (filePath) {
      const buffer = await blob.arrayBuffer();
      await writeFile({ path: filePath, contents: new Uint8Array(buffer) });
    }
  } else {
    window.location.href = `/api/download?path=${encodeURIComponent(fileName)}`;
  }
}
