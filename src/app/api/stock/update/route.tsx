import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { writeFile, readFile } from "fs/promises";
import { sql } from "@vercel/postgres";

// DB
import { ASSET_PATH, PROOF_STOCK_DB, PROOF_ITEM_XLSX_FILE } from "@/configs/db";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM STOCKS;`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error });
//   }
// }

export async function POST(request: NextRequest) {
  try {
    let transfromDataFromExcel;
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const wsname = workbook.SheetNames[0];
    const ws = workbook.Sheets[wsname];
    transfromDataFromExcel = XLSX.utils.sheet_to_json(ws, { header: 1 });
    transfromDataFromExcel = transfromDataFromExcel.filter(
      (data: any) => data.length > 0
    );

    transfromDataFromExcel.forEach(async (data: any) => {
      await sql`INSERT INTO STOCKS (name, code, uom) VALUES (${data[0]}, ${data[1]}, ${data[2]});`;
    });
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE() {
  try {
    await sql`DELETE FROM STOCKS;`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const data = await request.formData();
//     const file: File | null = data.get("file") as unknown as File;
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     await writeFile(ASSET_PATH + PROOF_ITEM_XLSX_FILE, buffer);

//     set_fs(await import("fs"));
//     const filename = ASSET_PATH + "template-item.xlsx";
//     const workBook = readFileXL(filename);
//     const sheetData = utils.sheet_to_json(
//       workBook.Sheets[workBook.SheetNames[0]],
//       { header: 1 }
//     );

//     await writeFile(ASSET_PATH + PROOF_STOCK_DB, JSON.stringify(sheetData));

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error });
//   }
// }
