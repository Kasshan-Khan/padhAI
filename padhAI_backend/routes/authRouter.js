const express = require("express");
const router = express.Router();

const { signup, login, googleAuth, updateDomain } = require("../controllers/authController");
const { verifyJWT } = require("../middleware/authMiddleware.js");

// API routes (JSON only)
router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleAuth);

// Protected routes
router.post("/domain", verifyJWT, updateDomain);

module.exports = router;
