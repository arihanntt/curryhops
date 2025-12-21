import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Pdf from "@/models/Pdf";

export async function GET() {
  await connectDB();

  const pdf = await Pdf.findOne();

  return NextResponse.json(pdf);
}
