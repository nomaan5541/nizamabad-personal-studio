import Customer from "../models/Customer.js";
import Member from "../models/Member.js"; // ✅ IMPORTANT
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ REGISTER
export const registerCustomer = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // check existing user
    const exist = await Customer.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ CREATE CUSTOMER (login system)
    const customer = await Customer.create({
      name,
      email,
      phone,
      password: hashed,
    });

    // ✅ CREATE MEMBER (admin dashboard)
    await Member.create({
      name,
      email,
      phone,
      startDate: new Date(), // required field
      isActive: false, // default inactive
    });

    res.json({
      msg: "Registered successfully ✅",
      customer,
    });
  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Error registering user" });
  }
};

// ✅ LOGIN
export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(400).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, customer.password);

    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Login error" });
  }
};
