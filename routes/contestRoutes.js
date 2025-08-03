const express = require("express");
const router = express.Router();
const Contest = require("../models/Contest");

// GET all contests
router.get("/", async (req, res) => {
  try {
    const contests = await Contest.find().sort({ startDate: 1 });
    res.json(contests);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch contests" });
  }
});

// POST create new contest
router.post("/", async (req, res) => {
  try {
    const {
      name,
      organization,
      startDate,
      endDate,
      description,
      questions,
      status,
      category
    } = req.body;

    if (!name || !organization || !startDate || !endDate || !description) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    const newContest = new Contest({
      name,
      organization,
      startDate,
      endDate,
      description,
      questions,
      status,
      category
    });

    await newContest.save();
    res.status(201).json({ message: "Contest created successfully", contest: newContest });
  } catch (err) {
    console.error("Creation error:", err);
    res.status(500).json({ error: "Failed to create contest" });
  }
});

// GET contest by ID
router.get("/:id", async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({ error: "Contest not found" });
    res.json(contest);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contest by ID" });
  }
});

// DELETE route in Express
router.delete("/:id", async (req, res) => {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);
    if (!contest) return res.status(404).json({ message: "Contest not found" });
    res.json({ message: "Contest deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting contest" });
  }
});

module.exports = router;
