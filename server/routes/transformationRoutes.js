import express from "express";
import upload from "../middleware/upload.js";
import {
  addTransformation,
  getTransformations,
} from "../controllers/transformationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ ADMIN UPLOAD
router.post(
  "/",
  protect,
  upload.fields([
    { name: "before", maxCount: 1 },
    { name: "after", maxCount: 1 },
  ]),
  addTransformation,
);

// ✅ PUBLIC FETCH
router.get("/", getTransformations);

export default router;
