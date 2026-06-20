const express = require("express");
const cors = require("cors");
const connectDB = require("./db/index.js")
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

dotenv.config();

const authRouter = require("./routes/authRouter");
const transcriptRouter = require("./routes/transcriptRouter");

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for now to avoid blocking React inline scripts/images
}));

const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.FRONTEND_URL || 'http://localhost:5000']
  : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'production') {
      // In production, if serving from the same domain, origin might be undefined
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // limit each IP to 150 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
app.use("/api/", apiLimiter);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/transcript", transcriptRouter);
app.use("/api/eisenhower", require("./routes/eisenhowerRouter"));
app.use("/api/pomodoro", require("./routes/pomodoroRouter"));
app.use("/api/chat", require("./routes/chatRouter"));

// Test route (only useful in dev, but kept for health checks)
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend running securely 🚀" });
});


// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ msg: "Internal Server Error" });
});

// DB
const PORT = process.env.PORT || 5000;

// Start server (without database for now - using in-memory storage)
// Start server after DB connection


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

