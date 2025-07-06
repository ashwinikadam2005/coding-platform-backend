const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

// Seed a default problem
router.post("/add", async (req, res) => {
  try {
    const { title, description, difficulty, category, testCases } = req.body;

    const newProblem = new Problem({
      title,
      description,
      difficulty,
      category,
      testCases,
    });

    await newProblem.save();
    res.status(201).json({ message: "Problem added successfully" });
  } catch (error) {
    console.error("Add problem error:", error);
    res.status(500).json({ message: "Failed to add problem", error });
  }
});


router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching problems" });
  }
});

module.exports = router;
