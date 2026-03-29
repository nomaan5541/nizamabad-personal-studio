// 🔥 MUST BE FIRST
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cron from "node-cron";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import transformationRoutes from "./routes/transformationRoutes.js";

import Member from "./models/Member.js";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();

// DEBUG (optional)
console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/transformations", transformationRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

// 🔥 CRON JOB (RUNS DAILY AT MIDNIGHT - PRODUCTION)
cron.schedule("0 0 * * *", async () => {
  console.log("⏰ Running expiry check...");

  try {
    const now = new Date();

    const expiredMembers = await Member.find({
      subscriptionActive: true,
      subscriptionEnd: { $lte: now },
    });

    for (let member of expiredMembers) {
      member.subscriptionActive = false;
      await member.save();

      // ✅ USER EMAIL
      await sendEmail(
        member.email,
        "Membership Expired - Nizamabad PT Studio",
        `
Hello ${member.name},

Your membership has expired.

To continue your training and progress,
please renew your subscription.

We are here to support your fitness journey 💪

Regards,
Nizamabad Personal Training Studio
        `,
      );

      // ✅ ADMIN EMAIL
      await sendEmail(
        process.env.EMAIL_USER,
        "Member Subscription Expired",
        `
Member Name: ${member.name}
Email: ${member.email}

Subscription has expired.
        `,
      );
    }

    console.log(`✅ Expired processed: ${expiredMembers.length}`);
  } catch (err) {
    console.log("CRON ERROR:", err.message);
  }
});

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
