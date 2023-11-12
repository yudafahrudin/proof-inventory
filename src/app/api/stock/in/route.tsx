import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const dateNow = new Date().toISOString();

  try {
    data.forEach(async (stockIn: any) => {
      await sql`INSERT INTO STOCKS_IN (date_in, stock_id, value, created_at) VALUES (${stockIn.date_in}, ${stockIn.stock_id}, ${stockIn.value}, ${dateNow});`;
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
