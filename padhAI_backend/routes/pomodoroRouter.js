const express = require('express');
const router = express.Router();
const { generatePomodoroPlan } = require('../controllers/pomodoro.controller');
const { verifyJWT } = require('../middleware/authMiddleware');

router.post('/generate', verifyJWT, generatePomodoroPlan);

module.exports = router;
