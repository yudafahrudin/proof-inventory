import { NextRequest, NextResponse } from "next/server";
import { readFile as readFileXL, set_fs, utils } from "xlsx";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import { cwd } from "process";

const ASSET_PATH = join(cwd(), "src/assets/", "");
const PROOF_DB = "proof-stock-in-db.json";

interface Payload {
  date: string;
  listStock: any[];
  listValue: any[];
}

export async function GET() {
  try {
    const data = await readFile(ASSET_PATH + PROOF_DB, "utf8");
    return NextResponse.json({ data: data.toString() });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: Payload = await request.json();
    const db = await readFile(ASSET_PATH + PROOF_DB, "utf8");
    const dataParse = JSON.parse(db) || [];
    dataParse.push(data);

    await writeFile(ASSET_PATH + PROOF_DB, JSON.stringify(dataParse));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
