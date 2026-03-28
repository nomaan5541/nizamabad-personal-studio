import express from "express";
import {
  addMember,
  getMembers,
  toggleSubscription,
} from "../controllers/memberController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", addMember);
router.get("/", protect, getMembers);
router.put("/:id/toggle", protect, toggleSubscription);

export default router;
