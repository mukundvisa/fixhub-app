import { getSession } from "@/lib/session";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const [rows]: any = await db.query(
    "SELECT id, email, name FROM users WHERE email = ?",
    [session.email],
  );

  const user = rows[0];

  return NextResponse.json(user);
}
