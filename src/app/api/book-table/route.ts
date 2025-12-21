import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  await Booking.create({
    name: body.name,
    phone: body.phone,
    date: body.date,
    time: body.time,
    people: body.people,
    status: "pending",
  });

  return NextResponse.json({ success: true });
}
