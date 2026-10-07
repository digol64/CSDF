const express = require("express");
const Incident = require("../models/Incident");

const router = express.Router();

// Create a new incident
router.post("/", async (req, res) => {
  try {
    const { title, description, reportedBy } = req.body;

    if (!title || !description || !reportedBy) {
      return res.status(400).json({
        error: "Title, description and reportedBy are required",
      });
    }

    const incident = new Incident({
      title,
      description,
      reportedBy,
    });

    await incident.save();

    res.status(201).json({
      message: "Incident reported successfully",
      incident,
    });
  } catch (error) {
    console.error("Incident creation error:", error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

// Get all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find().sort({
      date: -1,
    });

    res.json(incidents);
  } catch (error) {
    console.error("Fetching incidents error:", error);

    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;