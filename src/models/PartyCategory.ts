import mongoose, { Schema, model, models } from "mongoose";

const PartyPackageSchema = new Schema({
  id: { type: String, required: true }, // Frontend Drag-and-Drop ID
  name: { type: String, required: true },
  type: { type: String, enum: ["veg", "non-veg", "mixed"], default: "veg" },
  price: { type: String, required: true },
  tagline: { type: String, default: "" },
  pdfUrl: { type: String, default: "" }, // Stores the Cloudinary URL
});

const PartyCategorySchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    packages: [PartyPackageSchema],
  },
  { timestamps: true }
);

// Prevent model recompilation error in Next.js
const PartyCategory = models.PartyCategory || model("PartyCategory", PartyCategorySchema);

export default PartyCategory;