const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Get all candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await User.find().select("-password");
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get single candidate by ID
router.get("/:id", async (req, res) => {
  try {
    const candidate = await User.findById(req.params.id).select("-password");
    if (!candidate) return res.status(404).json({ error: "Candidate not found" });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Schedule Interview
router.post("/:id/schedule", async (req, res) => {
  try {
    const { date, time, interviewer } = req.body;
    const candidateId = req.params.id;

    // you can save to DB here later
    res.json({
      message: "📅 Interview scheduled successfully",
      candidateId,
      date,
      time,
      interviewer,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
