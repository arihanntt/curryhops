import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Menu from "@/models/Menu";
export const dynamic = "force-dynamic";


const DEFAULT_MENU = {
  sections: [
    { id: "breakfast", title: "Breakfast", items: [] },
    { id: "lunch", title: "Lunch", items: [] },
    { id: "dinner", title: "Dinner", items: [] },
    { id: "drinks", title: "Drinks", items: [] },
  ],
};

export async function GET() {
  await connectDB();

  let menu = await Menu.findOne();

  if (!menu) {
    menu = await Menu.create(DEFAULT_MENU);
  }

  return NextResponse.json(menu);
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();

  await Menu.findOneAndUpdate({}, body, { upsert: true });
  return NextResponse.json({ success: true });
}
