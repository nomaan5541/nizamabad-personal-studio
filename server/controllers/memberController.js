import Member from "../models/Member.js";
import { sendEmail } from "../utils/sendEmail.js";

// ADD MEMBER
export const addMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ msg: "Error adding member" });
  }
};

// GET MEMBERS
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch {
    res.status(500).json({ msg: "Error fetching members" });
  }
};

// 🔥 FINAL TOGGLE (30 DAYS)
export const toggleSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }

    // ✅ ACTIVATE (30 DAYS)
    if (!member.subscriptionActive) {
      const start = new Date();
      const end = new Date(start);
      end.setDate(start.getDate() + 30); // 🔥 30 DAYS

      member.subscriptionActive = true;
      member.subscriptionStart = start;
      member.subscriptionEnd = end;

      await member.save();

      await sendEmail(
        member.email,
        "Membership Activated - Nizamabad PT Studio",
        `
Hello ${member.name},

Your membership has been successfully activated.

📅 Start Date: ${start.toDateString()}
📅 Expiry Date: ${end.toDateString()}

You now have full access to all training services.

Stay consistent. Stay strong 💪

Regards,
Nizamabad Personal Training Studio
        `,
      );
    }

    // ❌ DEACTIVATE
    else {
      member.subscriptionActive = false;
      await member.save();

      await sendEmail(
        member.email,
        "Membership Deactivated - Nizamabad PT Studio",
        `
Hello ${member.name},

Your membership has been deactivated.

If this was not intended or you want to continue,
please contact the admin.

Regards,
Nizamabad Personal Training Studio
        `,
      );
    }

    res.json(member);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Toggle failed" });
  }
};
