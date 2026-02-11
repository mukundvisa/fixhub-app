import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = "ZFToXk9CLnh11MY1pdb8rCj2KfibMuGoEqMgUO1xhIw";

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

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1d",
    });

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
