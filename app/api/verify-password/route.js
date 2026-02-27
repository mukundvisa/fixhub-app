import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { userId, password } = await req.json();

    const [rows] = await db.execute("SELECT password FROM users WHERE id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, rows[0].password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 },
      );
    }

    return NextResponse.json({ message: "Password verified" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
