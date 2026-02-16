import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // <--- Importing YOUR existing file
import PartyCategory from "@/models/PartyCategory";

export async function GET() {
  try {
    await connectDB(); // Use your existing connection function
    
    const categories = await PartyCategory.find({}).lean();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching party menu:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // STRATEGY: 
    // Since the frontend sends the complete, reordered list, we
    // clear the old collection and insert the new one to save the order.
    
    // 1. Delete all existing categories
    await PartyCategory.deleteMany({});

    // 2. Insert the new sorted array
    await PartyCategory.insertMany(body);

    return NextResponse.json({ success: true, message: "Menu updated successfully" });
  } catch (error) {
    console.error("Error updating party menu:", error);
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
  }
}