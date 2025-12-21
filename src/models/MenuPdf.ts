import mongoose from "mongoose";

const MenuPdfSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.MenuPdf ||
  mongoose.model("MenuPdf", MenuPdfSchema);
