const express = require("express");
const router = express.Router();
const Contest = require("../models/Contest");


// GET all contests
router.get("/", async (req, res) => {
  try {
    const contests = await Contest.find().sort({ date: 1 });
    res.json(contests);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch contests" });
  }
});

// POST a new contest
router.post("/", async (req, res) => {
  try {
    const { name, organization, date, description, status, category } = req.body;

    if (!name || !organization || !date || !description) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const newContest = new Contest({
      name,
      organization,
      date,
      description,
      status,
      category,
    });

    await newContest.save();
    res.status(201).json({ message: "Contest created successfully", contest: newContest });
  } catch (err) {
    console.error("Creation error:", err);
    res.status(500).json({ error: "Failed to create contest" });
  }
});

// Get contest by ID
router.get("/:id", async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ error: "Contest not found" });
    res.json(contest);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contest by ID" });
  }
});


module.exports = router;
