import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { id, name, code, uom } = await request.json();
  try {
    const rows =
      await sql`UPDATE STOCKS SET name = ${name}, code = ${code}, uom = ${uom} WHERE id = ${id}`;
    return NextResponse.json({
      success: rows,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
