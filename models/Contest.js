const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: {
    type: [String],
    validate: [arr => arr.length === 4, 'Exactly 4 options required']
  },
  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return this.options.includes(value);
      },
      message: "Correct answer must be one of the options"
    }
  }
});

const contestSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  organization: { type: String, required: true, trim: true, maxlength: 100 },
  startDate: { type: Date, required: true },
  endDate: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: "End date must be after start date"
    }
  },
  description: { type: String, required: true, maxlength: 500 },
  questions: [questionSchema],
  status: { type: String, enum: ["active", "upcoming", "archived"], default: "upcoming" },
  category: { type: String, enum: ["college", "general"], default: "general" },
}, { timestamps: true });

module.exports = mongoose.model("Contest", contestSchema);
