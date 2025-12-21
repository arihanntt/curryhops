import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: String,
});

const SectionSchema = new mongoose.Schema({
  id: String,
  title: String,
  items: [ItemSchema],
});

const MenuSchema = new mongoose.Schema(
  {
    sections: [SectionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Menu ||
  mongoose.model("Menu", MenuSchema);
