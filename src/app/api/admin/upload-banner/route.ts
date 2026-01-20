import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Banner from "@/models/Banner";

// Force dynamic ensures the API isn't cached statically
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await connectDB();

    // 1. Get the JSON payload (NOT FormData anymore)
    const body = await req.json();
    const { imageUrl } = body;

    // 2. Validation
    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    // 3. Update the Database
    // We use findOneAndUpdate with upsert:true to ensure only ONE banner exists
    const updatedBanner = await Banner.findOneAndUpdate(
      {}, // Filter: Match any document (since we only want one banner)
      { imageUrl: imageUrl }, // Update: Set the new URL
      { upsert: true, new: true } // Options: Create if doesn't exist, return new doc
    );

    return NextResponse.json({
      success: true,
      banner: updatedBanner,
    });

  } catch (error: any) {
    console.error("Banner Save Error:", error);
    return NextResponse.json(
      { error: "Failed to save banner to database" },
      { status: 500 }
    );
  }
}