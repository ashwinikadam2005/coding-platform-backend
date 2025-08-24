const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config(); // Load .env variables

const authRoutes = require("./routes/auth");
const problemRoutes = require("./routes/problem");
const recruiterRoutes = require("./routes/recruiter");
const profileRoutes = require("./routes/profile"); // DO NOT CALL profileRoutes()
const contestRoutes = require("./routes/contestRoutes");
const userRoutes = require("./routes/userRoutes");
const solvedRoutes = require("./routes/solved");
const submissionRoutes = require("./routes/submissions");
const leaderboardRoutes = require("./routes/leaderboard");
const progressRoutes = require("./routes/progress");
const userContestRoutes = require("./routes/userContests");
const recruiterContestRoutes = require("./routes/recruiterContest");
const candidateRoutes = require("./routes/candidateRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (uploaded resumes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 Coding Platform API is running...");
});

// Route mounting
app.use("/api", authRoutes);
app.use("/api/problem", problemRoutes);
app.use("/api/recruiters", recruiterRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/solved", solvedRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/user-contests", userContestRoutes);
app.use("/recruiter/contest", recruiterContestRoutes);
app.use("/api/candidates", candidateRoutes);

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Graceful shutdown on Ctrl+C
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("🛑 MongoDB disconnected on app termination");
    process.exit(0);
  });
});
