import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Slot from "@/models/Slot";

/* ===== GET ALL SLOTS ===== */
export async function GET() {
  await connectDB();

  const slots = await Slot.find().sort({ date: 1, hour: 1 });

  return NextResponse.json(slots, {
    headers: { "Cache-Control": "no-store" },
  });
}

/* ===== CREATE / UPDATE SLOT ===== */
export async function POST(req: Request) {
  await connectDB();

  const { date, hour, tablesAvailable } = await req.json();

  if (!date || !hour) {
    return NextResponse.json(
      { error: "Missing date or hour" },
      { status: 400 }
    );
  }

  await Slot.findOneAndUpdate(
    { date, hour },
    { tablesAvailable },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}
