import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const { id, programmingLanguage, problemTitle, fixCode, userId } =
      await req.json();

    if (!programmingLanguage || !problemTitle || !fixCode || !userId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    if (id) {
      // UPDATE
      const query = `
        UPDATE fixcode 
        SET programming_language = ?, program_title = ?, fix_code = ?
        WHERE ID = ? AND user_id = ?
      `;

      await db.execute(query, [
        programmingLanguage,
        problemTitle,
        fixCode,
        id,
        userId,
      ]);

      return NextResponse.json({ message: "Fix updated successfully" });
    } else {
      // INSERT
      const query = `
        INSERT INTO fixcode (programming_language, program_title, fix_code, user_id)
        VALUES (?, ?, ?, ?)
      `;

      await db.execute(query, [
        programmingLanguage,
        problemTitle,
        fixCode,
        userId,
      ]);

      return NextResponse.json({ message: "Fix published successfully" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}
