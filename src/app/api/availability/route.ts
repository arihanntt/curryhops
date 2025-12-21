import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Slot from "@/models/Slot";

const DEFAULT_TABLES = 10;

export async function POST(req: Request) {
  await connectDB();
  const { date, time } = await req.json();

  const hour = time.slice(0, 2) + ":00";

  const slotOverride = await Slot.findOne({ date, hour });
  const totalTables = slotOverride
    ? slotOverride.tablesAvailable
    : DEFAULT_TABLES;

  const booked = await Booking.countDocuments({
    date,
    time,
    status: { $ne: "rejected" },
  });

  return NextResponse.json({
    available: booked < totalTables,
    remainingTables: Math.max(totalTables - booked, 0),
  });
}
