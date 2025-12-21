import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Pdf from "@/models/Pdf";
export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  const pdf = await Pdf.findOne().sort({ createdAt: -1 });

  return NextResponse.json({
    url: pdf?.url || null,
  });
}
