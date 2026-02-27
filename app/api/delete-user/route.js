import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(req) {
  try {
    const { userId } = await req.json();

    await db.execute("DELETE FROM users WHERE id = ?", [userId]);

    return NextResponse.json(
      { message: "Your account has been deleted" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
