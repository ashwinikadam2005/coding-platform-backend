const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  problemId: {
    type: String,
    required: true,
  },
  title: String,
  userCode: String,
  languageId: Number,
  userId: String, 
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
