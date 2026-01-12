import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: String,
    price: String,
    desc: String,

    // Food
    isNonVeg: {
      type: Boolean,
      default: false,
    },

    // Bar
    showBottlePeg: {
      type: Boolean,
      default: false,
    },
    bottlePrice: {
      type: String,
      default: "",
    },
    pegPrice: {
      type: String,
      default: "",
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

export default mongoose.models.Menu ||
  mongoose.model("Menu", MenuSchema);
