import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Banner from "@/models/Banner";
export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  const banner = await Banner.findOne();
  return NextResponse.json(banner);
}
