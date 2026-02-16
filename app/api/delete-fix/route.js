import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    await db.execute("DELETE FROM fixcode WHERE ID = ?", [id]);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
