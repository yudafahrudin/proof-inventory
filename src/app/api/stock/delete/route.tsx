import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    if (req.method === "DELETE") {
      if (id) {
        await sql`DELETE FROM STOCKS WHERE id = ${String(id)};`;
      } else {
        await sql`DELETE FROM STOCKS;`;
      }
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
