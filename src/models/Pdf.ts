import mongoose from "mongoose";

const PdfSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Pdf || mongoose.model("Pdf", PdfSchema);
