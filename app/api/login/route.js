import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Invalid Email" }, { status: 400 });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 },
      );
    }

    await createSession(user.email);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
