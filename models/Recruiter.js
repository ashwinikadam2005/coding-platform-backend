const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  website: { type: String },
  recruiterName: { type: String, required: true },
  role: { type: String },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // You can hash this with bcrypt
}, { timestamps: true });

module.exports = mongoose.model("Recruiter", recruiterSchema);
