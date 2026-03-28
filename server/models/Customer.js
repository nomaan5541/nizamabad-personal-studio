import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  phone: String,
  password: String,

  isActive: {
    type: Boolean,
    default: false,
  },

  startDate: Date,

  expiryDate: Date,
});

export default mongoose.model("Customer", customerSchema);
