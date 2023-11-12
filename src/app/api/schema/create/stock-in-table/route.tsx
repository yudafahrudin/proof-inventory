import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`CREATE TABLE STOCKS_IN ( 
        id serial primary key, 
        date_in varchar(255), 
        stock_id INT, 
        value varchar(255),
        created_at TIMESTAMPTZ ,
        CONSTRAINT fk_stock FOREIGN KEY(stock_id) REFERENCES stocks(id)
        );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
