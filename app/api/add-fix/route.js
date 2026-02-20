import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getSession } from "@/lib/session";

export async function POST(req) {
  try {
    // get session
    const session = await getSession();

    if (!session?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // get user from DB
    const [users] = await db.execute("SELECT id FROM users WHERE email = ?", [
      session.email,
    ]);

    if (!users.length) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = users[0].id;

    const { id, programmingLanguage, problemTitle, fixCode } = await req.json();

    if (!programmingLanguage || !problemTitle || !fixCode) {
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
