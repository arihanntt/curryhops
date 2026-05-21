import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    isActive:    { type: Boolean, default: false },
    badgeText:   { type: String, default: "🍺 New Release" },
    title:       { type: String, default: "Something Special is Brewing" },
    description: { type: String, default: "Our craft kitchen has been working on something extraordinary. Come taste the difference — limited time only." },
    imageUrl:    { type: String, default: "" },
    imageSize:   { type: String, default: "" },
    buttonText:  { type: String, default: "Explore the Menu" },
    buttonLink:  { type: String, default: "/menu" },
  },
  { timestamps: true }
);

// Clear model cache in dev so schema changes are always picked up
if (process.env.NODE_ENV !== "production" && mongoose.models.Banner) {
  delete mongoose.models.Banner;
}

export default mongoose.models.Banner || mongoose.model("Banner", BannerSchema);
