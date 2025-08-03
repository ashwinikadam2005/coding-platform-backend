const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  points: { type: Number, default: 0 },
  stars: { type: Number, default: 0 },
  badges: { type: Number, default: 0 },
});

module.exports = mongoose.model("UserProgress", userProgressSchema);
