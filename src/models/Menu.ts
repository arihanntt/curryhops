import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: String,
    price: String,
    desc: String,
    // NEW FIELD: only relevant for food items
    isNonVeg: {
      type: Boolean,
      default: false,           // default = veg
    },
  },
  { _id: false }
);

const SectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    menuType: {
      type: String,
      enum: ["food", "bar"],
      required: true,
    },
    items: [ItemSchema],
  },
  { _id: false }
);

const MenuSchema = new mongoose.Schema(
  {
    sections: [SectionSchema],
  },
  { timestamps: true }
);

// Export (same as before)
export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema);