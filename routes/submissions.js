const express = require("express");
const router = express.Router();
const Submission = require("../models/Submissions");

// Create submission
router.post("/", async (req, res) => {
  const { problemId, title, userCode, languageId, userId, timestamp } = req.body;

  try {
    const newSubmission = new Submission({
      problemId,
      title,
      userCode,
      languageId,
      userId,
      timestamp,
    });

    await newSubmission.save();
    res.status(200).json({ message: "Submission saved." });
  } catch (err) {
    console.error("Error saving submission:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all submissions for a specific problem (optional)
router.get("/:problemId", async (req, res) => {
  try {
    const submissions = await Submission.find({ problemId: req.params.problemId });
    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
