import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const { programmingLanguage, problemTitle, fixCode } = await req.json();

    if (!programmingLanguage || !problemTitle || !fixCode) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const query =
      "INSERT INTO fixcode (programming_language, program_title, fix_code) VALUES (?, ?, ?)";

    await db.execute(query, [programmingLanguage, problemTitle, fixCode]);

    return NextResponse.json(
      { message: "Fix published successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}
