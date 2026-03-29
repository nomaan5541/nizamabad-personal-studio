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

// ✅ TRUST PROXY (important for Render)
app.set("trust proxy", 1);

// ✅ CONNECT DB
connectDB();

// ✅ CORS (allow all for now — later restrict)
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

// ✅ MIDDLEWARE
app.use(express.json());

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/transformations", transformationRoutes);

// ✅ HEALTH CHECK (IMPORTANT FOR RENDER)
app.get("/", (req, res) => {
  res.status(200).send("API Running...");
});

// =====================================================
// 🔥 CRON JOB (RUN DAILY - PRODUCTION)
// =====================================================
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
    console.log("❌ CRON ERROR:", err.message);
  }
});

// =====================================================
// 🚀 SERVER START
// =====================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
