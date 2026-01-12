import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Menu from "@/models/Menu";

export const dynamic = "force-dynamic";

type MenuItem = {
  name: string;
  price: string;
  desc: string;
};

type MenuSection = {
  id: string;
  title: string;
  menuType: "food" | "bar";
  items: MenuItem[];
};

/* ---------------- DEFAULT STRUCTURE ---------------- */
const DEFAULT_MENU = {
  sections: [
    // FOOD sections...
    { id: "quick-bites", title: "Quick Bites", menuType: "food", items: [] },
    { id: "salad", title: "Salad", menuType: "food", items: [] },
    { id: "appetizers", title: "Appetizers", menuType: "food", items: [] },
    { id: "pizza", title: "Pizza", menuType: "food", items: [] },
    { id: "pasta", title: "Pasta", menuType: "food", items: [] },
    { id: "main-course", title: "Main Course", menuType: "food", items: [] },
    { id: "biryani", title: "Biryani", menuType: "food", items: [] },
    { id: "breads", title: "Breads", menuType: "food", items: [] },
    { id: "rice-noodles", title: "Rice and Noodles", menuType: "food", items: [] },
    { id: "dessert", title: "Dessert", menuType: "food", items: [] },

    // BAR sections... (keep all of them as before)
    { id: "signature-cocktails", title: "Signature Cocktails", menuType: "bar", items: [] },
    // ... all other bar sections ...
    { id: "soft-drinks", title: "Soft Drinks", menuType: "bar", items: [] },
  ] as MenuSection[],
};

/* ---------------- GET ---------------- */
export async function GET() {
  await connectDB();
  let menu = await Menu.findOne();

  if (!menu) {
    menu = await Menu.create(DEFAULT_MENU);
  }

  // Optional: ensure missing sections are added (defensive)
  const existingIds = new Set(menu.sections.map((s: any) => s.id));
  const missing = DEFAULT_MENU.sections.filter(s => !existingIds.has(s.id));
  if (missing.length > 0) {
    menu.sections.push(...missing);
    await menu.save();
  }

  return NextResponse.json(menu);
}

/* ---------------- PUT – MERGE, DON'T REPLACE ---------------- */
export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();

  const incomingSections: Partial<MenuSection>[] = body.sections || [];
  if (!Array.isArray(incomingSections)) {
    return NextResponse.json({ error: "sections must be an array" }, { status: 400 });
  }

  let menu = await Menu.findOne();
  if (!menu) {
    menu = await Menu.create(DEFAULT_MENU);
  }

  // Create map of current sections by id
  const currentMap = new Map<string, any>(
    menu.sections.map((s: any) => [s.id, s])
  );

  // Update only the sections that came from client
  for (const inc of incomingSections) {
    if (!inc.id) continue;

    const existing = currentMap.get(inc.id);
    if (existing) {
      // Only update items – never change title / menuType / id
      existing.items = inc.items || [];
      console.log(`Updated section: ${inc.id} → ${inc.items?.length || 0} items`);
    } else {
      console.warn(`Ignoring unknown section id: ${inc.id}`);
    }
  }

  await menu.save();

  return NextResponse.json({ 
    success: true, 
    updatedCount: incomingSections.length 
  });
}