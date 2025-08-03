const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: {
    type: [String],
    validate: [arr => arr.length === 4, 'Exactly 4 options required']
  },
  correctAnswer: { type: String, required: true }
});

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  questions: [questionSchema],
  status: { type: String, enum: ["active", "upcoming", "archived"], default: "upcoming" },
  category: { type: String, enum: ["college", "general"], default: "general" },
});

module.exports = mongoose.model("Contest", contestSchema);
