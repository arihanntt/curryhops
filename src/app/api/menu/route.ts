import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Menu from "@/models/Menu";

export const dynamic = "force-dynamic";

const DEFAULT_MENU = {
  sections: [
    // FOOD (unchanged)
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
    // BAR (unchanged)
    { id: "signature-cocktails", title: "Signature Cocktails", menuType: "bar", items: [] },
    { id: "classics", title: "Classics", menuType: "bar", items: [] },
    { id: "liits", title: "OUR LIIT'S", menuType: "bar", items: [] },
    { id: "beer-cocktails", title: "Beer Cocktails", menuType: "bar", items: [] },
    { id: "coffee", title: "Coffee", menuType: "bar", items: [] },
    { id: "hot-cocktails", title: "Hot Cocktails", menuType: "bar", items: [] },
    { id: "rum", title: "Rum", menuType: "bar", items: [] },
    { id: "gin", title: "Gin", menuType: "bar", items: [] },
    { id: "vodka", title: "Vodka", menuType: "bar", items: [] },
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
  ],
};

function normalizeSections(sectionsToNormalize: any[]) {
  const sectionMap = new Map(sectionsToNormalize.map((s: any) => [s.id, s]));

  return DEFAULT_MENU.sections.map(base => {
    const matched = sectionMap.get(base.id);
    if (matched) {
      console.log(`Normalizing section ${base.id}: Keeping menuType=${base.menuType}`);
    } else {
      console.warn(`No client data for section ${base.id} – using default`);
    }
    return {
      id: base.id,
      title: base.title,
      menuType: base.menuType,
      items: matched?.items || [],
    };
  });
}

/* ---------------- GET ---------------- */
export async function GET() {
  await connectDB();
  let menu = await Menu.findOne();
  
  if (!menu) {
    console.log("Creating new menu from default");
    menu = await Menu.create(DEFAULT_MENU);
    return NextResponse.json(menu);
  }

  // Always normalize on load
  console.log("Normalizing menu on GET");
  menu.sections = normalizeSections(menu.sections || []);
  await menu.save();

  return NextResponse.json(menu);
}

/* ---------------- PUT ---------------- */
export async function PUT(req: Request) {
  await connectDB();
  
  const body = await req.json();
  const clientSections = body.sections;

  if (!clientSections || !Array.isArray(clientSections)) {
    console.error("Invalid PUT request: No sections array");
    return NextResponse.json(
      { error: "Invalid request: sections array is required" },
      { status: 400 }
    );
  }

  let menu = await Menu.findOne();
  if (!menu) {
    console.log("Creating new menu on PUT");
    menu = await Menu.create(DEFAULT_MENU);
  }

  // Normalize with client data
  console.log("Normalizing menu on PUT");
  menu.sections = normalizeSections(clientSections);
  
  await menu.save();
  
  return NextResponse.json({ success: true, menu });
}