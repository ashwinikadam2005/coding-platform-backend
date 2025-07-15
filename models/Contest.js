// models/Contest.js
const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  organization: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "upcoming", "archived"],
    default: "upcoming",
  },
  category: {
    type: String,
    enum: ["college", "general"],
    default: "general",
  },
});

module.exports = mongoose.model("Contest", contestSchema);
