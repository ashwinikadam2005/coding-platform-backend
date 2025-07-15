// 1. Update User model to support contest registration
// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  phone: String,
  location: String,
  resumeUrl: String,
  skills: [String],
  links: {
    github: String,
    linkedin: String
  },
  experience: [
    {
      company: String,
      role: String,
      from: Date,
      to: Date,
      description: String,
    }
  ],
  education: [
    {
      institution: String,
      degree: String,
      field: String,
      start: Date,
      end: Date,
      gradeType: String,
      grade: String
    }
  ],
  badges: [String],
  certifications: [String],
  registeredContests: [
    {
      contestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest'
      },
      registeredAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
