const express = require("express");
const cors = require("cors");
const connectDB = require("./db/index.js")
const dotenv = require("dotenv");

dotenv.config();

const authRouter = require("./routes/authRouter");
const transcriptRouter = require("./routes/transcriptRouter");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);   
app.use("/api/transcript", transcriptRouter);   

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

// DB
const PORT = process.env.PORT || 5000;

// Start server (without database for now - using in-memory storage)
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Uncomment below when database is configured

connectDB()
.then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error("Database connection failed", err);
});

