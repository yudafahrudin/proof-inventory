import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   return res.status(200);
// }

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
