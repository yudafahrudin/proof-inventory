import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM STOCKS ORDER BY name ASC;`;

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
