import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();

  const bookings = await Booking.find()
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(bookings, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
