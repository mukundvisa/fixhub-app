import { NextResponse } from "next/server";
import db from "@/lib/db";
import { unstable_cache } from "next/cache";

const getMenu = unstable_cache(
  async () => {
    const [rows]: any = await db.query(
      "SELECT menu_json FROM menus ORDER BY id DESC LIMIT 1",
    );

    if (!rows.length) return null;

    return JSON.parse(rows[0].menu_json);
  },
  ["menu-cache"],
  {
    tags: ["menu"],
  },
);

export async function GET() {
  try {
    const data = await getMenu();

    if (!data) {
      return NextResponse.json({ error: "No links found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: 500 },
    );
  }
}
