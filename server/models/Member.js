import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // ✅ ADD THIS
    phone: { type: String },
    password: { type: String }, // (optional for future login)

    plan: { type: String, default: "Monthly" },

    startDate: { type: Date, required: true },

    expiryDate: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }, // ✅ IMPORTANT for sorting
);

// auto expiry (1 month)
memberSchema.pre("save", function (next) {
  if (this.startDate) {
    const date = new Date(this.startDate);
    date.setMonth(date.getMonth() + 1);
    this.expiryDate = date;
  }
  next();
});

export default mongoose.model("Member", memberSchema);
