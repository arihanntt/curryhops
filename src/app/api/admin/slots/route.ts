import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Slot from "@/models/Slot";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const slots = await Slot.find().sort({ date: 1, hour: 1 });
  return NextResponse.json(slots);
}

export async function POST(req: Request) {
  await connectDB();

  const { date, hour, tablesAvailable } = await req.json();

  await Slot.findOneAndUpdate(
    { date, hour },
    { tablesAvailable },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}
