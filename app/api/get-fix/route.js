import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const page = Number(searchParams.get("page")) || 1;
  const id = searchParams.get("id") || "";

  const limit = 20;
  const offset = (page - 1) * limit;

  if (id) {
    const [rows] = await db.query("SELECT * FROM fixcode WHERE id = ?", [id]);

    return NextResponse.json({
      problem: rows[0] || null,
    });
  }

  let where = "WHERE 1=1";
  let values = [];

  if (search) {
    where += " AND program_title LIKE ?";
    values.push(`%${search}%`);
  }

  if (category) {
    where += " AND programming_language LIKE ?";
    values.push(`%${category}%`);
  }

  // Get paginated problems
  const [rows] = await db.query(
    `SELECT * FROM fixcode ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
    [...values, limit, offset],
  );

  // Get total count
  const [[count]] = await db.query(
    `SELECT COUNT(*) AS total FROM fixcode ${where}`,
    values,
  );

  // Get ALL languages from DB (for dropdown)
  const [langs] = await db.query("SELECT programming_language FROM fixcode");

  // Normalize languages
  const categories = [
    ...new Set(
      langs.flatMap((item) =>
        item.programming_language?.split(",").map((l) => l.trim()),
      ),
    ),
  ];

  return NextResponse.json({
    problems: rows,
    categories,
    total: count.total,
    page,
  });
}
