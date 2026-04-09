import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function GET(req: NextRequest) {
  const filePath = req.nextUrl.searchParams.get("path");

  if (!filePath || !fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const filename = filePath.split(/[\\/]/).pop();
  const isDocx = filename?.endsWith(".docx");

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": isDocx
        ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        : "text/plain",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
