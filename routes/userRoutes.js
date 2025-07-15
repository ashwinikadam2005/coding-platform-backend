const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Contest = require("../models/Contest");

// Register a user for a contest
router.post("/register-contest", async (req, res) => {
  const { userId, contestId } = req.body;

  try {
    const user = await User.findById(userId);
    const contest = await Contest.findById(contestId);

    if (!user || !contest) {
      return res.status(404).json({ error: "User or Contest not found" });
    }

    if (user.registeredContests.includes(contestId)) {
      return res.status(400).json({ message: "Already registered for this contest" });
    }

    user.registeredContests.push(contestId);
    await user.save();

    res.status(200).json({ message: "Registered successfully", user });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Failed to register for contest" });
  }
});
// GET user with registered contests
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("registeredContests");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      registeredContests: user.registeredContests,
    });
  } catch (err) {
    console.error("User fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
