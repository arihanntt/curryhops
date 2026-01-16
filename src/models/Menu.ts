import mongoose from "mongoose";

// --- NEW: Schema for Add-ons/Variants ---
const VariantSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    price: { type: String, trim: true },
  },
  { _id: false }
);

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },

    // Multi-tag system (Non-Veg, Egg, Spicy, Kids, Vegan, Gluten Free, Chef's Special)
    tags: {
      type: [String],
      default: [],
    },

    // Dish image URL
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },

    // --- NEW FIELDS (These were missing!) ---
    available: {
      type: Boolean,
      default: true, // Defaults to "Serving Now"
    },
    isCustomizable: {
      type: Boolean,
      default: false,
    },
    variants: [VariantSchema], // Stores the add-ons list

    // Legacy food field
    isNonVeg: {
      type: Boolean,
      default: false,
    },

    // Bar-specific fields
    showBottlePeg: {
      type: Boolean,
      default: false,
    },
    bottlePrice: {
      type: String,
      default: "",
      trim: true,
    },
    pegPrice: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false } // No automatic _id for embedded items
);

const SectionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    menuType: {
      type: String,
      enum: ["food", "bar"],
      required: true,
    },
    items: [ItemSchema],
  },
  { _id: false } // No _id for sections
);

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

// Prevent model re-compilation in hot-reload (Next.js dev mode)
export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema);