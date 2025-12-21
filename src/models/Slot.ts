import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema(
  {
    date: String,
    hour: String,
    tablesAvailable: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Slot ||
  mongoose.model("Slot", SlotSchema);
