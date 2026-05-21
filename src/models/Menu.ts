import mongoose from "mongoose";

// --- VARIANT SCHEMA (Add-ons) ---
const VariantSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    price: { type: String, trim: true },
  },
  { _id: false }
);

// --- ITEM SCHEMA (Dishes) ---
const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    price: { type: String, trim: true },
    desc: { type: String, trim: true },
    tags: { type: [String], default: [] },
    
    // Dish Image fields
    imageUrl: { type: String, trim: true, default: "" },
    imageSize: { type: String, default: "" }, 

    available: { type: Boolean, default: true },
    isCustomizable: { type: Boolean, default: false },
    variants: [VariantSchema],

    // Legacy/Extra fields
    isNonVeg: { type: Boolean, default: false },

    // Bar Specific fields
    showBottlePeg: { type: Boolean, default: false },
    bottlePrice: { type: String, default: "", trim: true },
    pegPrice: { type: String, default: "", trim: true },
  },
  { _id: false }
);

// --- SECTION SCHEMA (Categories) ---
const SectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    menuType: { type: String, enum: ["food", "bar", "kids"], required: true },
    
    // Visibility Toggle for the whole category
    visible: { type: Boolean, default: true }, 

    // ✅ NEW: Category Background Image (Replaces hardcoded frontend links)
    imageUrl: { type: String, default: "" },

    items: [ItemSchema],
  },
  { _id: false }
);

// --- MAIN MENU SCHEMA ---
const MenuSchema = new mongoose.Schema(
  {
    sections: [SectionSchema],
  },
  {
    timestamps: true,
    strict: false,       
    strictPopulate: false, 
  }
);

// In development, delete the cached model so schema changes (e.g. new enum values)
// are always picked up after a hot-reload. In production, use the cached model.
if (process.env.NODE_ENV !== "production" && mongoose.models.Menu) {
  delete mongoose.models.Menu;
}

export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema);