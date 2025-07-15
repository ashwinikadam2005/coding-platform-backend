// models/SolvedProblem.js
const mongoose = require("mongoose");

const SolvedSchema = new mongoose.Schema({
  problemId: {
    type: String, 
    required: true,
  },
  title: String,
  userCode: String,
  languageId: Number,
  userId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Solved", SolvedSchema);
