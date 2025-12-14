const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRouter = require("./routes/authRouter");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);   

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

// =====================
// DB + Server (YOUR STYLE)
// =====================
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected to:", mongoose.connection.name);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
.catch((err) => {
    console.error("Database connection failed", err);
});
