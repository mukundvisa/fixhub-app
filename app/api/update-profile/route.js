import db from "@/lib/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function PUT(req) {
  try {
    const formData = await req.formData();

    const id = formData.get("id");
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const gender = formData.get("gender");
    const bio = formData.get("bio");
    const address = formData.get("address");
    const city = formData.get("city");
    const country = formData.get("country");
    const pincode = formData.get("pincode");
    const file = formData.get("profile_image");

    if (!id) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 400 },
      );
    }

    let imagePath = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = Date.now() + "-" + file.name;
      const uploadDir = path.join(process.cwd(), "public/uploads");

      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);

      imagePath = `/uploads/${fileName}`;
    }

    // If no new image, keep old one
    if (imagePath) {
      await db.query(
        `UPDATE users SET 
          name=?, email=?, phone=?, gender=?, bio=?, 
          address=?, city=?, country=?, pincode=?, 
          profile_image=? 
         WHERE id=?`,
        [
          name,
          email,
          phone,
          gender,
          bio,
          address,
          city,
          country,
          pincode,
          imagePath,
          id,
        ],
      );
    } else {
      await db.query(
        `UPDATE users SET 
          name=?, email=?, phone=?, gender=?, bio=?, 
          address=?, city=?, country=?, pincode=? 
         WHERE id=?`,
        [name, email, phone, gender, bio, address, city, country, pincode, id],
      );
    }

    return NextResponse.json({ message: "Profile Updated Successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
