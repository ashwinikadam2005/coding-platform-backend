// routes/solved.js
const express = require("express");
const router = express.Router();
const Solved = require("../models/SolvedProblem");

// Save solved problem
router.post("/", async (req, res) => {
  const { problemId, title, userCode, languageId, userId } = req.body;

  try {
    const existing = await Solved.findOne({ problemId, userId });
    if (existing) {
      return res.status(200).json({ message: "Already solved" });
    }

    const newSolved = new Solved({
      problemId,
      title,
      userCode,
      languageId,
      userId,
    });

    await newSolved.save();
    res.status(200).json({ message: "Solved problem saved." });
  } catch (err) {
    console.error("Error saving solved problem:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get solved problems by userId
router.get("/", async (req, res) => {
  const userId = req.query.userId;

  try {
    const solved = await Solved.find(userId ? { userId } : {});
    res.status(200).json(solved);
  } catch (err) {
    console.error("Error fetching solved problems:", err);
    res.status(500).json({ error: "Failed to fetch solved problems" });
  }
});

module.exports = router;
