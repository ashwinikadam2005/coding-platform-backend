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
    linkedin: String,
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
      grade: String,
    }
  ],
  // ✅ NEW FIELDS FOR PROGRESS TRACKING
  points: {
    type: Number,
    default: 0,
  },
  stars: {
    type: Number,
    default: 0,
  },
  badges: [String],

  // ✅ Track solved problems and difficulty
  solvedProblems: [
    {
      problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
      },
      difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"]
      },
      solvedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

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
