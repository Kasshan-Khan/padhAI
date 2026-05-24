const express = require("express");
const router = express.Router();
const { YoutubeTranscript } = require("../controllers/transcriptController");

// POST /api/transcript/summary - Get transcript summary
router.post("/summary", YoutubeTranscript);

module.exports = router;
