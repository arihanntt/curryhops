import mongoose from "mongoose";

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

    // Multi-tag system (Non-Veg, Egg, Spicy, Kids, Vegan, etc.)
    tags: {
      type: [String],
      default: [],
    },

    // NEW: Dish image URL (optional, shown as circle in menu)
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },

    // Legacy food field (optional – can remove later if using tags exclusively)
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
      // Optional: index if you query by section id often
      // index: true,
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
    strict: false,           // Allows new fields like imageUrl without errors
    strictPopulate: false,   // Extra safety for sub-document population
  }
);

// Prevent model re-compilation in hot-reload (Next.js dev mode)
export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema);