import { NextResponse } from "next/server";
// import { writeFile, readFile } from "fs/promises";

// DB
import { ASSET_PATH, PROOF_STOCK_IN_DB } from "@/configs/db";

export async function GET() {
  try {
    // const data = await readFile(ASSET_PATH + PROOF_STOCK_IN_DB, "utf8");
    // return NextResponse.json({ data: data.toString() });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
