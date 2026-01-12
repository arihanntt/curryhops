// api/events/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import EventModel from "@/models/Event";
import type { Model } from "mongoose";

export const dynamic = "force-dynamic";

// 🔥 FIX: Cast model so TS stops marking it red
const Event = EventModel as Model<any>;

export async function GET() {
  await connectDB();
  const events = await Event.find().sort({ order: 1, date: 1 });
  return NextResponse.json(events);
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!Array.isArray(body.events)) {
      return NextResponse.json(
        { error: "Bad format – need events array" },
        { status: 400 }
      );
    }

    const cleanedEvents = body.events.map((item: any, idx: number) => {
      const clean = { ...item };

      // ❌ REMOVE FRONTEND / MONGO FIELDS
      delete clean._id;
      delete clean.__v;
      delete clean.uniqueKey;
      delete clean.tempId;

      // ✅ ENSURE SLUG
      const slugValue = (clean.slug || "").trim();
      if (!slugValue && clean.title) {
        clean.slug = clean.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }

      // ✅ FORCE ORDER
      clean.order = typeof clean.order === "number" ? clean.order : idx;

      return clean;
    });

    // 🚀 ATOMIC REPLACE (SAFE)
    await Event.collection.bulkWrite(
      [
        { deleteMany: { filter: {} } },
        ...cleanedEvents.map((event: any) => ({
          insertOne: { document: event },
        })),
      ],
      { ordered: true }
    );

    const fresh = await Event.find().sort({ order: 1, date: 1 });
    return NextResponse.json(fresh);
  } catch (err: any) {
    console.error("SAVE ERROR:", err);

    if (err.code === 11000) {
      return NextResponse.json(
        { error: "Duplicate slug – change one of the slugs" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Save failed – server problem" },
      { status: 500 }
    );
  }
}
