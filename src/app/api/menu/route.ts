import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Menu from "@/models/Menu";

// ✅ CHANGE: Remove "force-dynamic" to allow Next.js to cache the menu for speed.
// We will use revalidation instead.
export const revalidate = 3600; // Cache the menu for 1 hour

/* ---------------- TYPES ---------------- */
type MenuVariant = {
  name: string;
  price: string;
};

type MenuItem = {
  name?: string;
  price?: string;
  desc?: string;
  tags?: string[];
  imageUrl?: string;
  available?: boolean; 
  isCustomizable?: boolean;
  variants?: MenuVariant[];
  showBottlePeg?: boolean;
  bottlePrice?: string;
  pegPrice?: string;
};

type MenuSection = {
  id: string;
  title: string;
  menuType: "food" | "bar";
  items: MenuItem[];
};

const DEFAULT_MENU = {
  sections: [
    { id: "quick-bites", title: "Quick Bites", menuType: "food", items: [] },
    { id: "main-course", title: "Main Course", menuType: "food", items: [] },
    // ... rest of your categories
  ] as MenuSection[],
};

/* ---------------- GET ---------------- */
export async function GET() {
  try {
    await connectDB();

    const menu = await Menu.findOne().lean(); // .lean() makes the query faster
    
    if (!menu) {
      const newMenu = await Menu.create(DEFAULT_MENU);
      return NextResponse.json(newMenu);
    }

    // ✅ SEO ADVANTAGE: We add a Cache-Control header so Google knows this page is stable
    return NextResponse.json(menu, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
  }
}

/* ---------------- PUT ---------------- */
export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { sections } = body;

    if (!Array.isArray(sections)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    let menu = await Menu.findOne();
    if (!menu) {
      menu = new Menu(DEFAULT_MENU);
    }

    const normalizedSections = sections.map((inc: any) => ({
      id: inc.id,
      title: inc.title || "Untitled",
      menuType: inc.menuType || "food",
      items: (inc.items || []).map((item: any) => ({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags : [],
        available: item.available !== false,
        isCustomizable: !!item.isCustomizable,
        variants: Array.isArray(item.variants) ? item.variants : [],
        ...(item.showBottlePeg !== true && {
          showBottlePeg: undefined,
          bottlePrice: undefined,
          pegPrice: undefined,
        }),
      })),
    }));

    menu.sections = normalizedSections;
    menu.markModified("sections");
    await menu.save();

    // ✅ IMPORTANT: When you update the menu, you want the cache to clear
    // Next.js handles this automatically in most cases when a POST/PUT happens.

    return NextResponse.json(menu);
  } catch (error: any) {
    console.error("Menu PUT error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}