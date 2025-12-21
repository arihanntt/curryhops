import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/mongodb";
import Pdf from "@/models/Pdf";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("pdf") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No PDF selected" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // ✅ MUST BE RAW
        folder: "menu",
        public_id: `menu-${Date.now()}`,
      },
      (error, uploadResult) => {
        if (error) reject(error);
        else resolve(uploadResult);
      }
    ).end(buffer);
  });

  // Save only latest PDF
  await Pdf.deleteMany({});
  await Pdf.create({ url: result.secure_url });

  return NextResponse.json({ success: true });
}
