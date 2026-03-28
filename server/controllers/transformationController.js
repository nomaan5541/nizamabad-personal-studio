import Transformation from "../models/Transformation.js";

// ✅ ADD TRANSFORMATION (SAFE VERSION)
export const addTransformation = async (req, res) => {
  try {
    console.log("FILES RECEIVED:", req.files);
    console.log("BODY:", req.body);

    // ✅ Validate files
    if (!req.files || !req.files.before || !req.files.after) {
      return res.status(400).json({ msg: "Both images are required" });
    }

    const beforeFile = req.files.before[0];
    const afterFile = req.files.after[0];

    if (!beforeFile || !afterFile) {
      return res.status(400).json({ msg: "Image upload failed" });
    }

    const { description } = req.body;

    const item = await Transformation.create({
      before: beforeFile.path, // Cloudinary URL
      after: afterFile.path,
      description: description || "",
    });

    res.json({
      msg: "Uploaded successfully ✅",
      data: item,
    });
  } catch (err) {
    console.log("UPLOAD ERROR FULL:", err);
    res.status(500).json({
      msg: "Upload failed",
      error: err.message,
    });
  }
};

// ✅ GET ALL (LATEST FIRST)
export const getTransformations = async (req, res) => {
  try {
    const data = await Transformation.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.log("FETCH ERROR:", err);
    res.status(500).json({ msg: "Error fetching transformations" });
  }
};
