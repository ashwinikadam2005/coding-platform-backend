const express = require("express");
const router = express.Router();
const UserProgress = require("../models/UserProgress");
const User = require("../models/User"); // ✅ Import the User model

// GET progress by userId and sync with User model
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    let progress = await UserProgress.findOne({ userId });

    // If progress doesn't exist, create it
    if (!progress) {
      progress = new UserProgress({
        userId,
        points: 0,
        stars: 0,
        badges: 0,
      });
      await progress.save();
    }

    // ✅ Update the User model with progress data
    await User.findByIdAndUpdate(
      userId,
      {
        points: progress.points,
        stars: progress.stars,
        badges: progress.badges,
      },
      { new: true }
    );

    res.status(200).json(progress);
  } catch (err) {
    console.error("Error retrieving progress:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
