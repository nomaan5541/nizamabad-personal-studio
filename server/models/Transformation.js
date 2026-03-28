import mongoose from "mongoose";

const transformationSchema = new mongoose.Schema(
  {
    before: { type: String, required: true },
    after: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Transformation", transformationSchema);
