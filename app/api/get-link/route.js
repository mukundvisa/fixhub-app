import { NextResponse } from "next/server";
import db from "@/lib/db";

export const revalidate = 300;

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT menu_json FROM menus ORDER BY id DESC LIMIT 1",
    );

    if (!rows.length) {
      return NextResponse.json({ error: "No links found" }, { status: 404 });
    }

    const data = JSON.parse(rows[0].menu_json);

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 },
    );
  }
}
