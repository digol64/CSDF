const authMiddleware = require("../middleware/auth");
const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");

const router = express.Router();

// Store uploaded files in the uploads folder
const upload = multer({
  dest: "uploads/",
});

// Upload and analyze file
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    // Read uploaded file
    const buffer = fs.readFileSync(file.path);

    // Generate SHA-256 hash
    const sha256 = crypto
      .createHash("sha256")
      .update(buffer)
      .digest("hex");

    res.json({
      filename: file.originalname,
      sha256,
    });
  } catch (error) {
    console.error("File upload error:", error);

    res.status(500).json({
      error: "Error analyzing file",
    });
  }
});

module.exports = router;