const express = require("express");
const router = express.Router();
const Solved = require("../models/SolvedProblem");
const User = require("../models/User");
const languageMap = require("../utils/languageMap"); // 🆕 import the map

// GET leaderboard for a specific problem
router.get("/:problemId", async (req, res) => {
  const { problemId } = req.params;

  try {
    const entries = await Solved.find({ problemId }).sort({ createdAt: 1 });

    const leaderboard = await Promise.all(
      entries.map(async (entry) => {
        const user = await User.findById(entry.userId).select("name email");

        return {
          userId: entry.userId,
          name: user?.name || "Anonymous",
          email: user?.email || "",
          timestamp: entry.createdAt,
          languageId: entry.languageId,
          languageName: languageMap[entry.languageId] || "Unknown", // 🆕 include name
        };
      })
    );

    res.status(200).json(leaderboard);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET overall leaderboard: total problems solved per user
// GET overall leaderboard: all users ranked by problems solved
router.get("/overall/leaderboard", async (req, res) => {
  try {
    const aggregation = await Solved.aggregate([
      {
        $group: {
          _id: "$userId",
          problemsSolved: { $sum: 1 },
          latestSubmission: { $max: "$submittedAt" },
        },
      },
      {
        $sort: { problemsSolved: -1, latestSubmission: -1 }, // Sort by problems solved desc, then latest submission
      },
    ]);

    const leaderboard = await Promise.all(
      aggregation.map(async (entry) => {
        const user = await User.findById(entry._id).select("name email");
        return {
          userId: entry._id,
          name: user?.name || "Anonymous",
          email: user?.email || "N/A",
          problemsSolved: entry.problemsSolved,
          latestSubmission: entry.latestSubmission,
        };
      })
    );

    res.json(leaderboard);
  } catch (err) {
    console.error("Error fetching overall leaderboard:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
