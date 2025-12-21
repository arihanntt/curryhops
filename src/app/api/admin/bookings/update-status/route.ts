import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import mongoose from "mongoose";

export async function POST(req: Request) {
  await connectDB();

  const { id, status } = await req.json();

  await Booking.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { status }
  );

  return NextResponse.json({ success: true });
}
