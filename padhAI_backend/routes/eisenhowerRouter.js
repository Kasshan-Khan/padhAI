const express = require('express');
const router = express.Router();
const { generateEisenhowerMatrix } = require('../controllers/eisenhower.controller');
const { verifyJWT } = require('../middleware/authMiddleware');

router.post('/generate', verifyJWT, generateEisenhowerMatrix);

module.exports = router;
