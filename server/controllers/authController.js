import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ADMIN_EMAIL = "admin@gmail.com";

// REGISTER ADMIN
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL) {
      return res.status(403).json({ msg: "Only admin allowed" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    res.json(user);
  } catch {
    res.status(500).json({ msg: "Register error" });
  }
};

// LOGIN ADMIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch {
    res.status(500).json({ msg: "Login error" });
  }
};
