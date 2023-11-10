import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";

export async function GET() {
  try {
    const data = await readFile("./src/assets/proof-stock.json");
    return NextResponse.json({ data: data.toString() });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
