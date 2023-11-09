import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const file = path.join(process.cwd(), "src/assets/", "proof-stock.json");
    const data = await readFile(file, "utf8");
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
    await writeFile("./src/assets/proof-stock.json", buffer);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
