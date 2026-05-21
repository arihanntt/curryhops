import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Banner from "@/models/Banner";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* ---------------- GET ---------------- */
export async function GET() {
  try {
    await connectDB();
    const banner = await Banner.findOne().lean();

    if (!banner) {
      // Seed with default data on first load
      const created = await Banner.create({});
      return NextResponse.json(created);
    }

    return NextResponse.json(banner, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (err: any) {
    console.error("Banner GET Error:", err);
    return NextResponse.json({ error: "Failed to fetch banner" }, { status: 500 });
  }
}

/* ---------------- PUT ---------------- */
export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const updated = await Banner.findOneAndUpdate(
      {},
      {
        $set: {
          isActive:    body.isActive    ?? false,
          badgeText:   body.badgeText   ?? "",
          title:       body.title       ?? "",
          description: body.description ?? "",
          imageUrl:    body.imageUrl    ?? "",
          imageSize:   body.imageSize   ?? "",
          buttonText:  body.buttonText  ?? "",
          buttonLink:  body.buttonLink  ?? "/menu",
        },
      },
      { new: true, upsert: true }
    );

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("Banner PUT Error:", err);
    return NextResponse.json({ error: err.message || "Failed to save banner" }, { status: 500 });
  }
}
