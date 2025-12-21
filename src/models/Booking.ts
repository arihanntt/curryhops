import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    date: String,
    time: String,
    people: Number,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
