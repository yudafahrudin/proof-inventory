import { NextRequest, NextResponse } from "next/server";
import { readFile as readFileXL, set_fs, utils } from "xlsx";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import { cwd } from "process";

const ASSET_PATH = join(cwd(), "src/assets/", "");
const PROOF_ITEM_JSON_FILE = "proof-stock.json";
const PROOF_ITEM_XLSX_FILE = "template-item.xlsx";

export async function GET() {
  try {
    const data = await readFile(ASSET_PATH + PROOF_ITEM_JSON_FILE, "utf8");
    return NextResponse.json({ data: data.toString() });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  try {
    // save file
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(ASSET_PATH + PROOF_ITEM_XLSX_FILE, buffer);

    // write to JSON
    set_fs(await import("fs"));
    const filename = ASSET_PATH + "template-item.xlsx";
    const workBook = readFileXL(filename);
    const sheetData = utils.sheet_to_json(
      workBook.Sheets[workBook.SheetNames[0]],
      { header: 1 }
    );

    await writeFile(
      ASSET_PATH + PROOF_ITEM_JSON_FILE,
      JSON.stringify(sheetData)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
