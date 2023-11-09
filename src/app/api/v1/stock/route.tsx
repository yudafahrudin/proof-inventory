import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

const ASSET_PATH = path.join(process.cwd(), "src/assets/", "proof-stock.json");

export async function GET() {
  try {
    const data = await readFile(ASSET_PATH, "utf8");
    return NextResponse.json({ data: data.toString() });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(ASSET_PATH, buffer);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
