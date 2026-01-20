import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Menu from "@/models/Menu";
import { revalidatePath } from "next/cache"; 

// ✅ Force Dynamic mode to prevent Vercel from caching the API response
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
  imageSize?: string;
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
  visible?: boolean;
  imageUrl?: string; // 👈 This was missing in your types too!
  items: MenuItem[];
};

// Default structure if DB is empty
const DEFAULT_MENU = {
  sections: [
    { id: "quick-bites", title: "Quick Bites", menuType: "food", visible: true, imageUrl: "", items: [] },
    { id: "main-course", title: "Main Course", menuType: "food", visible: true, imageUrl: "", items: [] },
  ] as MenuSection[],
};

/* ---------------- GET METHOD ---------------- */
export async function GET() {
  try {
    await connectDB();

    const menu = await Menu.findOne().lean();

    if (!menu) {
      const newMenu = await Menu.create(DEFAULT_MENU);
      return NextResponse.json(newMenu);
    }

    return NextResponse.json(menu, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Surrogate-Control": "no-store",
      },
    });
  } catch (error: any) {
    console.error("GET Menu Error:", error);
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
  }
}

/* ---------------- PUT METHOD ---------------- */
export async function PUT(req: Request) {
  try {
    await connectDB();
    
    // 1. Parse Data
    const body = await req.json();
    const { sections } = body;

    // 2. Validate
    if (!Array.isArray(sections)) {
      return NextResponse.json({ error: "Invalid payload: 'sections' must be an array" }, { status: 400 });
    }

    // 3. Normalize Data (Sanitization & New Fields)
    const normalizedSections = sections.map((inc: any) => ({
      id: inc.id || `sec-${Date.now()}`,
      title: inc.title || "Untitled Section",
      menuType: inc.menuType || "food",
      
      // ✅ Handle Visibility
      visible: inc.visible !== false, 

      // ✅ NEW: Handle Category Image (This was missing!)
      imageUrl: inc.imageUrl || "",

      items: (inc.items || []).map((item: any) => ({
        name: item.name || "New Item",
        price: item.price || "0",
        desc: item.desc || "",
        tags: Array.isArray(item.tags) ? item.tags : [],
        imageUrl: item.imageUrl || "",
        
        // ✅ Handle Item Image Size
        imageSize: item.imageSize || "", 

        available: item.available !== false,
        isCustomizable: !!item.isCustomizable,
        variants: Array.isArray(item.variants) ? item.variants : [],
        
        // Conditional fields for Bar Menu
        ...(item.showBottlePeg === true ? {
          showBottlePeg: true,
          bottlePrice: item.bottlePrice || "",
          pegPrice: item.pegPrice || ""
        } : {
          showBottlePeg: false,
          bottlePrice: undefined,
          pegPrice: undefined
        })
      })),
    }));

    // 4. ATOMIC UPDATE (Database Write)
    const updatedMenu = await Menu.findOneAndUpdate(
      {}, 
      { $set: { sections: normalizedSections } }, 
      { new: true, upsert: true, runValidators: true } 
    );

    // 5. 🚀 PURGE CACHE
    revalidatePath('/menu');       
    revalidatePath('/admin/menu'); 
    revalidatePath('/');           

    return NextResponse.json(updatedMenu);

  } catch (error: any) {
    console.error("❌ Menu PUT Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save menu" }, 
      { status: 500 }
    );
  }
}