const express = require("express");
const router = express.Router();
const Contest = require("../models/Contest");

// ✅ Get all contests (without questions)
router.get("/all", async (req, res) => {
  try {
    const contests = await Contest.find({}, "-questions").sort({ startDate: 1 });
    res.status(200).json(contests);
  } catch (err) {
    console.error("Error fetching contests:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Get a single contest details (without questions)
router.get("/:id", async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id, "-questions");
    if (!contest) {
      return res.status(404).json({ error: "Contest not found" });
    }
    res.status(200).json(contest);
  } catch (err) {
    console.error("Error fetching contest:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Add a new contest
router.post("/add", async (req, res) => {
  try {
    const newContest = new Contest(req.body);
    await newContest.save();
    res
      .status(201)
      .json({ message: "Contest created successfully", contest: newContest });
  } catch (err) {
    console.error("Error creating contest:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update contest (without touching questions)
router.put("/:id", async (req, res) => {
  try {
    const updatedContest = await Contest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true, fields: "-questions" }
    );
    if (!updatedContest) {
      return res.status(404).json({ error: "Contest not found" });
    }
    res.status(200).json(updatedContest);
  } catch (err) {
    console.error("Error updating contest:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Delete a contest
router.delete("/:id", async (req, res) => {
  try {
    const deletedContest = await Contest.findByIdAndDelete(req.params.id);
    if (!deletedContest) {
      return res.status(404).json({ error: "Contest not found" });
    }
    res.status(200).json({ message: "Contest deleted successfully" });
  } catch (err) {
    console.error("Error deleting contest:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// ✅ Add a new question to a contest
router.post("/:id/questions", async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;

    if (!question || !options || options.length < 2 || !correctAnswer) {
      return res.status(400).json({ error: "Invalid question format" });
    }

    const contest = await Contest.findById(req.params.id);
    if (!contest) {
      return res.status(404).json({ error: "Contest not found" });
    }

    contest.questions.push({ question, options, correctAnswer });
    await contest.save();

    res.status(201).json({ message: "Question added successfully", contest });
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
