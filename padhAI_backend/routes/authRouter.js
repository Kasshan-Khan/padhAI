const express = require("express");
const router = express.Router();

const {signup , login} = require("../controllers/authController");

// API routes (JSON only)
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
