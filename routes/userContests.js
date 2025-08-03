//userContest.js
const express = require("express");
const router = express.Router();
const Contest = require("../models/Contest");

router.get("/available", async (req, res) => {
  try {
    const now = new Date();

    const contests = await Contest.find({
      endDate: { $gte: now },
    }).sort({ startDate: 1 });

    const result = {
      active: [],
      upcoming: [],
    };

    contests.forEach((contest) => {
      if (contest.startDate <= now && contest.endDate >= now) {
        result.active.push(contest);
      } else if (contest.startDate > now) {
        result.upcoming.push(contest);
      }
    });

    res.json(result);
  } catch (err) {
    console.error("Error fetching available contests:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { userId, contestId } = req.body;

  if (!userId || !contestId) {
    return res.status(400).json({ error: "userId and contestId are required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.registeredContests.includes(contestId)) {
      return res.status(400).json({ error: "Already registered" });
    }

    user.registeredContests.push(contestId);
    await user.save();

    res.status(200).json({ message: "Successfully registered" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:id/access", async (req, res) => {
  const { id: contestId } = req.params;
  const { userId } = req.query;

  try {
    const contest = await Contest.findById(contestId);
    const user = await User.findById(userId);

    if (!contest || !user)
      return res.status(404).json({ error: "User or Contest not found" });

    const isRegistered = user.registeredContests.includes(contestId);

    const now = new Date();
    const inTime =
      new Date(contest.startDate) <= now && new Date(contest.endDate) >= now;

    if (!isRegistered)
      return res.status(403).json({ error: "User not registered" });

    if (!inTime)
      return res.status(403).json({ error: "Contest not currently accessible" });

    res.status(200).json({ access: true, message: "Access granted" });
  } catch (err) {
    console.error("Access check error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
