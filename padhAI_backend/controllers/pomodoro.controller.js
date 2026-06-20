const axios = require('axios');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/AsyncHandler');

const generatePomodoroPlan = asyncHandler(async (req, res) => {
    const { available_hours, tasks, preferences } = req.body;
    const userDomain = req.user?.goal || "General Student"; // Access domain from authenticated user

    // 1. Validation
    if (!available_hours || available_hours <= 0) {
        throw new ApiError(400, "Available hours must be greater than 0");
    }
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
        throw new ApiError(400, "Tasks array is required and must not be empty");
    }

    const pref = preferences || {};
    const breakLength = pref.break_length || 5;
    const focusLevel = pref.focus_level || "medium";
    const timeOfDay = pref.time_of_day || "anytime";

    // 2. Build Prompt
    const prompt = `
You are an expert study planner using the Pomodoro Technique.
Create a study schedule for a student preparing for ${userDomain}.

**Inputs:**
- Available Time: ${available_hours} hours
- Tasks to Cover: ${tasks.join(', ')}
- Preferences: Break length ${breakLength} min, Focus Level ${focusLevel}, Time of Day ${timeOfDay}.

**Rules:**
- Standard Pomodoro is 25 min work + 5 min break (or user preference).
- Every 4 sessions, schedule a longer break (15-30 min).
- Distribute tasks intelligently based on typical cognitive load for ${userDomain}.
- Return STRICT JSON only. No markdown.

**Output JSON Structure:**
{
  "pomodoro_length": 25,
  "break_length": ${breakLength},
  "total_sessions": 0,
  "schedule": [
    {
      "session": 1,
      "task": "Specific task name",
      "focus_minutes": 25,
      "break_minutes": 5,
      "note": "Brief tip"
    }
  ]
}
`;

    // 3. Call AI Service
    let aiResponseText;
    try {
        const response = await axios.post(process.env.PYTHON_SERVER_URL || 'http://localhost:8000/api/generate', {
            prompt: prompt
        });

        if (response.data && response.data.text) {
            aiResponseText = response.data.text;
        } else {
            throw new Error("Invalid response from AI service");
        }
    } catch (error) {
        console.error("AI Service Error:", error.message);
        throw new ApiError(503, "Failed to generate plan via AI service");
    }

    // 4. Parse JSON
    let plan;
    try {
        const cleanJson = aiResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
        plan = JSON.parse(cleanJson);
    } catch (error) {
        console.error("JSON Parse Error:", error);
        console.error("Raw AI Response:", aiResponseText);
        throw new ApiError(500, "Failed to parse AI response. Please try again.");
    }

    // 5. Structure Validation
    if (!plan.schedule || !Array.isArray(plan.schedule)) {
        throw new ApiError(500, "AI returned invalid structure");
    }

    // 6. Return Response
    return res.status(200).json(
        new ApiResponse(200, plan, "Pomodoro plan generated successfully")
    );
});

module.exports = {
    generatePomodoroPlan
};
