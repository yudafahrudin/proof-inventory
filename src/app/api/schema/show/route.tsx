import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`select 
    * 
  from 
    pg_catalog.pg_tables 
  where 
    schemaname != 'information_schema' 
    and schemaname != 'pg_catalog';`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
