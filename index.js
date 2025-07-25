const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const authRoutes = require("./routes/auth");
const problemRoutes = require("./routes/problem");
const recruiterRoutes = require("./routes/recruiter");
const profileRoutes = require("./routes/profile"); // ✅ DO NOT CALL AS A FUNCTION
const contestRoutes = require("./routes/contestRoutes");
const userRoutes = require("./routes/userRoutes");
const solvedRoutes = require("./routes/solved");
const submissionRoutes = require("./routes/submissions");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRoutes);
app.use("/api/problem", problemRoutes);
app.use("/api/recruiters", recruiterRoutes);
app.use("/api/profile", profileRoutes); // ✅ THIS MUST NOT BE profileRoutes()
app.use("/api/contests", contestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/solved", solvedRoutes);
app.use("/api/submissions",submissionRoutes );
app.use("/api/leaderboard", leaderboardRoutes);  // 👈 mount leaderboard route

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server started on port 5000"));
  })
  .catch((err) => console.error("DB error:", err));
