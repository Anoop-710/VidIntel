export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import util from "util";

const execPromise = util.promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const model = formData.get("model") as string;
    const mode = formData.get("mode") as string;
    const output = formData.get("output") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tempDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const filePath = path.join(tempDir, file.name);
    fs.writeFileSync(filePath, buffer);

    // Output file path
    const outputPath = path.join(tempDir, `output.${output}`);

    // Run Python CLI
    const command = `python -m cli.main "${filePath}" --model "${model}" --mode "${mode}" --output "${outputPath}"`;

    const { stdout, stderr } = await execPromise(command, {
      cwd: path.join(process.cwd(), "../../"),
    });

    if (stderr) {
      console.error(stderr);
    }

    // Read output file
    const isDocx = output === "docx";

    return NextResponse.json({
      logs: stdout,
      filePath: outputPath,
      isDocx,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Processing failed" },
      { status: 500 },
    );
  }
}
