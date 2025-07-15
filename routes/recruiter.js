const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Recruiter = require("../models/Recruiter");

// POST /api/recruiters - Signup recruiter
router.post("/signup", async (req, res) => {
  try {
    const { companyName, website, recruiterName, role, contact, email, password } = req.body;

    // Check for existing user
    const existing = await Recruiter.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newRecruiter = new Recruiter({
      companyName,
      website,
      recruiterName,
      role,
      contact,
      email,
      password: hashedPassword,
    });

    await newRecruiter.save();
    res.status(201).json({ message: "Recruiter account created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
