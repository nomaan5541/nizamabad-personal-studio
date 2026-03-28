import Member from "../models/Member.js";
import { sendEmail } from "../utils/sendEmail.js";

// ✅ ADD MEMBER
export const addMember = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email required" });
    }

    const existing = await Member.findOne({ email });

    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const member = await Member.create(req.body);

    res.status(201).json(member);
  } catch (err) {
    console.log("ADD MEMBER ERROR:", err);
    res.status(500).json({ msg: "Error adding member" });
  }
};

// ✅ GET MEMBERS (IMPORTANT FIX)
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    console.log("GET MEMBERS ERROR:", err);
    res.status(500).json({ msg: "Error fetching members" });
  }
};

// ✅ TOGGLE (SAFE VERSION)
export const toggleSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }

    // ✅ FIX: direct update (NO validation issue)
    const updated = await Member.findByIdAndUpdate(
      id,
      { isActive: !member.isActive },
      { new: true },
    );

    // ✅ SAFE EMAIL
    if (!updated.isActive && updated.email) {
      try {
        await sendEmail(
          updated.email,
          "Membership Expired",
          "Your membership is inactive. Please renew.",
        );
      } catch (err) {
        console.log("EMAIL ERROR (ignored):", err.message);
      }
    }

    res.json(updated);
  } catch (err) {
    console.log("TOGGLE ERROR FULL:", err);
    res.status(500).json({
      msg: "Toggle failed",
      error: err.message,
    });
  }
};
