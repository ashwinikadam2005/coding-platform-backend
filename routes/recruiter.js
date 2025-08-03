const express = require("express");
const bcrypt = require("bcrypt");
const Recruiter = require("../models/Recruiter");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { companyName, website, recruiterName, role, contact, email, password } = req.body;

    const existing = await Recruiter.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

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

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      recruiter: {
        id: recruiter._id,
        name: recruiter.recruiterName,
        email: recruiter.email,
        company: recruiter.companyName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all recruiters
router.get("/", async (req, res) => {
  try {
    const recruiters = await Recruiter.find({}, "-password"); // exclude password
    res.status(200).json(recruiters);
  } catch (error) {
    console.error("Fetch recruiters error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
