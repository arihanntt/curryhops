import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Banner from "@/models/Banner";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("banner") as File | null;

  if (!file) {
    return NextResponse.json(
      { error: "No banner image provided" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadResult = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "banners",
        public_id: "homepage-banner", // 🔥 always replace
        overwrite: true,
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  await Banner.findOneAndUpdate(
    {},
    { imageUrl: uploadResult.secure_url },
    { upsert: true }
  );

  return NextResponse.json({
    success: true,
    imageUrl: uploadResult.secure_url,
  });
}
