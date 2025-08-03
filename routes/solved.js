// // routes/solved.js
// const express = require("express");
// const router = express.Router();
// const Solved = require("../models/SolvedProblem");
// const UserProgress = require("./models/UserProgress"); // Import the model

// // Save solved problem
// router.post("/", async (req, res) => {
//   const { problemId, title, userCode, languageId, userId } = req.body;

//   try {
//     const existing = await Solved.findOne({ problemId, userId });
//     if (existing) {
//       return res.status(200).json({ message: "Already solved" });
//     }

//     const newSolved = new Solved({
//       problemId,
//       title,
//       userCode,
//       languageId,
//       userId,
//     });

//     await newSolved.save();
//     res.status(200).json({ message: "Solved problem saved." });
//   } catch (err) {
//     console.error("Error saving solved problem:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Get solved problems by userId
// router.get("/", async (req, res) => {
//   const userId = req.query.userId;

//   try {
//     const solved = await Solved.find(userId ? { userId } : {});
//     res.status(200).json(solved);
//   } catch (err) {
//     console.error("Error fetching solved problems:", err);
//     res.status(500).json({ error: "Failed to fetch solved problems" });
//   }
// });



// // After saving the solution:
// const problemDifficulty = problem.difficulty || "Easy"; // "Easy", "Medium", "Hard"

// let earnedPoints = 10;
// if (problemDifficulty === "Medium") earnedPoints = 15;
// if (problemDifficulty === "Hard") earnedPoints = 20;

// // Update or create user progress
// let progress = await UserProgress.findOne({ userId });
// if (!progress) {
//   progress = new UserProgress({ userId });
// }

// progress.points += earnedPoints;
// progress.stars = Math.floor(progress.points / 100);
// progress.badges = Math.floor(progress.stars / 5);
// await progress.save();

// module.exports = router;

//solved.js
const express = require("express");
const router = express.Router();
const Solved = require("../models/SolvedProblem");
const Problem = require("../models/Problem"); // To get difficulty
const UserProgress = require("../models/UserProgress"); // Corrected import

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

    // ---------------- Calculate Points ----------------
    const problem = await Problem.findById(problemId);
    const difficulty = problem?.difficulty || "Easy";

    let earnedPoints = 10;
    if (difficulty === "Medium") earnedPoints = 15;
    if (difficulty === "Hard") earnedPoints = 20;

    let progress = await UserProgress.findOne({ userId });
    if (!progress) {
      progress = new UserProgress({ userId, points: 0, stars: 0, badges: 0 });
    }

    progress.points += earnedPoints;
    progress.stars = Math.floor(progress.points / 100);     // 1 star every 100 points
    progress.badges = Math.floor(progress.stars / 5);       // 1 badge every 5 stars

    await progress.save();
    // --------------------------------------------------

    res.status(200).json({ message: "Solved problem saved and progress updated." });
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
