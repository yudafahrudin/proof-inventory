import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
  const { id, name, code, uom } = await request.json();
  try {
    if (!id) {
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

      const dateNew = new Date().toISOString();

      transfromDataFromExcel.forEach(async (data: any) => {
        await sql`INSERT INTO STOCKS (name, code, uom, created_at) VALUES (${data[0]}, ${data[1]}, ${data[2]}, ${dateNew});`;
      });
    } else {
      const rows =
        await sql`UPDATE STOCKS SET name = ${name}, code = ${code}, uom = ${uom} WHERE id = ${id}`;
      return NextResponse.json({
        success: rows,
      });
    }
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
