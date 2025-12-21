export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Banner from "@/models/Banner";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("banner");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No image received" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, "homepage-banner.jpg");
    fs.writeFileSync(filePath, buffer);

    const imageUrl = "/uploads/homepage-banner.jpg";

    await Banner.findOneAndUpdate(
      {},
      { imageUrl },
      { upsert: true }
    );

    return NextResponse.json({ success: true, imageUrl });
  } catch (err) {
    console.error("BANNER UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Banner upload failed" },
      { status: 500 }
    );
  }
}
