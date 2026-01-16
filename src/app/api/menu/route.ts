import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Menu from "@/models/Menu";

export const dynamic = "force-dynamic";

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
  
  // NEW FIELDS
  available?: boolean; // Defaults to true
  isCustomizable?: boolean;
  variants?: MenuVariant[];

  // Bar specific
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

/* ---------------- DEFAULT STRUCTURE ---------------- */

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
    { id: "sushi",     title: "Sushi",     menuType: "food", items: [] },
    { id: "dim-sum",   title: "Dim Sum",   menuType: "food", items: [] },

    // BAR
    { id: "signature-cocktails", title: "Signature Cocktails", menuType: "bar", items: [] },
    { id: "classics", title: "Classics", menuType: "bar", items: [] },
    { id: "liits", title: "OUR LIIT'S", menuType: "bar", items: [] },
    { id: "beer-cocktails", title: "Beer Cocktails", menuType: "bar", items: [] },
    { id: "coffee", title: "Coffee", menuType: "bar", items: [] },
    { id: "hot-cocktails", title: "Hot Cocktails", menuType: "bar", items: [] },
    { id: "rum", title: "Rum", menuType: "bar", items: [] },
    { id: "gin", title: "Gin", menuType: "bar", items: [] },
    { id: "vodka", title: "Vodka", menuType: "bar", items: [] },
    { id: "tequila", title: "Tequila", menuType: "bar", items: [] },
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

/* ---------------- PUT – SAFE & RELIABLE ---------------- */

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { sections } = body;

    if (!Array.isArray(sections)) {
      return NextResponse.json({ error: "Invalid payload: sections must be an array" }, { status: 400 });
    }

    let menu = await Menu.findOne();
    if (!menu) {
      menu = await Menu.create(DEFAULT_MENU);
    }

    // Validate & normalize incoming sections
    const normalizedSections = sections.map((inc: any) => {
      return {
        id: inc.id,
        title: inc.title || "Untitled",
        menuType: inc.menuType || "food",
        items: (inc.items || []).map((item: any) => {
          // Ensure tags is array
          const tags = Array.isArray(item.tags) ? item.tags : item.tags ? [String(item.tags)] : [];
          // Ensure variants is array
          const variants = Array.isArray(item.variants) ? item.variants : [];

          return {
            ...item,
            tags, 
            // New logic: ensure boolean or default to true for available
            available: item.available !== false, 
            isCustomizable: !!item.isCustomizable,
            variants: variants,

            // Protect bar fields
            ...(item.showBottlePeg !== true && {
              showBottlePeg: undefined,
              bottlePrice: undefined,
              pegPrice: undefined,
            }),
          };
        }),
      };
    });

    // Replace the entire sections array — frontend is source of truth
    menu.sections = normalizedSections;

    menu.markModified("sections");
    await menu.save();

    // Return fresh document
    const fresh = await Menu.findOne();
    return NextResponse.json(fresh || { sections: [] });
  } catch (error: any) {
    console.error("Menu PUT error:", error);
    return NextResponse.json(
      { error: "Failed to save menu", details: error.message },
      { status: 500 }
    );
  }
}