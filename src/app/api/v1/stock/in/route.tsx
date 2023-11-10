import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";

// DB
import { ASSET_PATH, PROOF_STOCK_IN_DB } from "@/configs/db";

interface Payload {
  date: string;
  listStock: any[];
  listValue: any[];
}

export async function GET() {
  try {
    const data = await readFile(ASSET_PATH + PROOF_STOCK_IN_DB, "utf8");
    return NextResponse.json({ data: data.toString() });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: Payload = await request.json();
    const db = await readFile(ASSET_PATH + PROOF_STOCK_IN_DB, "utf8");
    const dataParse = JSON.parse(db);
    dataParse.push(data);

    await writeFile(ASSET_PATH + PROOF_STOCK_IN_DB, JSON.stringify([]));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
