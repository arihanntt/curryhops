import mongoose, { Schema, model, models } from "mongoose";

export interface EventDocument {
  title: string;
  slug: string;
  date: string;
  time?: string;
  location?: string;
  summary?: string;
  details?: string;
  image?: string;
  order: number;
}

const EventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    date: { type: String, required: true },
    time: String,
    location: String,
    summary: String,
    details: String,
    image: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Event =
  models.Event || model<EventDocument>("Event", EventSchema);

export default Event;
