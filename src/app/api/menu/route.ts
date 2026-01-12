import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Menu from "@/models/Menu";

export const dynamic = "force-dynamic";

/* ---------------- TYPES ---------------- */

type MenuItem = {
  name?: string;
  price?: string;
  desc?: string;
  isNonVeg?: boolean;
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

/* ---------------- DEFAULT STRUCTURE (added Tequila) ---------------- */

const DEFAULT_MENU = {
  sections: [
    // FOOD
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

    // BAR – added Tequila at the end (you can reorder in editor now)
    { id: "signature-cocktails", title: "Signature Cocktails", menuType: "bar", items: [] },
    { id: "classics", title: "Classics", menuType: "bar", items: [] },
    { id: "liits", title: "OUR LIIT'S", menuType: "bar", items: [] },
    { id: "beer-cocktails", title: "Beer Cocktails", menuType: "bar", items: [] },
    { id: "coffee", title: "Coffee", menuType: "bar", items: [] },
    { id: "hot-cocktails", title: "Hot Cocktails", menuType: "bar", items: [] },
    { id: "rum", title: "Rum", menuType: "bar", items: [] },
    { id: "gin", title: "Gin", menuType: "bar", items: [] },
    { id: "vodka", title: "Vodka", menuType: "bar", items: [] },
    { id: "tequila", title: "Tequila", menuType: "bar", items: [] }, // ← NEW CATEGORY
    { id: "indian-whisky", title: "Indian Whisky", menuType: "bar", items: [] },
    { id: "indian-single-malts", title: "Indian Single Malts", menuType: "bar", items: [] },
    { id: "scotch", title: "Scotch", menuType: "bar", items: [] },
    { id: "japanese-whisky", title: "Japanese Whisky", menuType: "bar", items: [] },
    { id: "rye-bourbon", title: "Rye / Bourbon Whiskeys", menuType: "bar", items: [] },
    { id: "canadian-irish", title: "Canadian / Irish Whisky", menuType: "bar", items: [] },
    { id: "cognac-brandy", title: "Cognac / Brandy", menuType: "bar", items: [] },
    { id: "liquers", title: "Liquers", menuType: "bar", items: [] },
    { id: "aperitif", title: "Aperitif", menuType: "bar", items: [] },
    { id: "red-wine", title: "Red Wine", menuType: "bar", items: [] },
    { id: "rose-sparkling", title: "Rose & Sparkling Wine", menuType: "bar", items: [] },
    { id: "white-wine", title: "White Wine", menuType: "bar", items: [] },
    { id: "sangria", title: "Sangria", menuType: "bar", items: [] },
    { id: "champagne", title: "Champagne", menuType: "bar", items: [] },
    { id: "shots", title: "Shots & Shooters", menuType: "bar", items: [] },
    { id: "fresh-juices", title: "Fresh Juices", menuType: "bar", items: [] },
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

  return NextResponse.json(menu);
}

/* ---------------- PUT – FIXED & SAFE MERGE ---------------- */

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();

  const incomingSections = body.sections;
  if (!Array.isArray(incomingSections)) {
    return NextResponse.json({ error: "sections must be an array" }, { status: 400 });
  }

  let menu = await Menu.findOne();
  if (!menu) {
    menu = await Menu.create(DEFAULT_MENU);
  }

  for (const incSection of incomingSections) {
    const existingSection = menu.sections.find((s: any) => s.id === incSection.id);
    if (!existingSection) continue;

    // Preserve existing items not in incoming (safety)
    const updatedItems = [...(existingSection.items || [])];

    for (const incItem of incSection.items || []) {
      const key = (incItem.name || "").trim().toLowerCase();

      // Find matching item by name
      const index = updatedItems.findIndex(
        (item: any) => (item.name || "").trim().toLowerCase() === key
      );

      if (index !== -1) {
        // Update existing item (deep merge)
        updatedItems[index] = {
          ...updatedItems[index],
          ...incItem,
        };
      } else {
        // New item
        updatedItems.push(incItem);
      }
    }

    existingSection.items = updatedItems;
    existingSection.markModified("items");
  }

  menu.markModified("sections");
  await menu.save();

  const fresh = await Menu.findOne();
  return NextResponse.json(fresh);
}