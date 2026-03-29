import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    password: String,

    plan: { type: String, default: "Monthly" },

    // ✅ NEW SYSTEM
    subscriptionActive: { type: Boolean, default: false },
    subscriptionStart: Date,
    subscriptionEnd: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Member", memberSchema);
