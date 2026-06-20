const axios = require('axios');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/AsyncHandler');

const generateEisenhowerMatrix = asyncHandler(async (req, res) => {
    const { tasks, answers } = req.body;

    // 1. Validation
    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
        throw new ApiError(400, "Tasks array is required and must not be empty");
    }
    if (!answers || typeof answers !== 'object') {
        throw new ApiError(400, "Answers object is required");
    }

    // 2. Build Prompt
    const prompt = `
You are an expert productivity assistant. Your task is to classify a list of tasks into the Eisenhower Matrix quadrants based on the user's reflective answers.

**Constraints:**
- You must return ONLY valid JSON.
- Do not include markdown formatting (like \`\`\`json).
- Do not include explanations.

**Input:**

User's Tasks:
${tasks.map((t, i) => `${i + 1}. ${t}`).join('\n')}

User's Reflections:
1. Deadlines: ${answers.q1_deadlines || "N/A"}
2. Goal Impact: ${answers.q2_goal_impact || "N/A"}
3. Can Postpone?: ${answers.q3_postpone || "N/A"}
4. Can Delegate?: ${answers.q4_delegate || "N/A"}
5. Mental Load: ${answers.q5_mental_load || "N/A"}
6. Consequences: ${answers.q6_consequences || "N/A"}
7. Priority Preference: ${answers.q7_priority_preference || "N/A"}

**Task:**
Analyze each task against the reflections.
- Urgent & Important: Tasks with immediate deadlines and high consequences/goal impact.
- Not Urgent but Important: Tasks with long-term goals, high impact, but no immediate deadline.
- Urgent but Not Important: Tasks that need immediate attention but have low long-term impact or can be delegated.
- Not Urgent and Not Important: Tasks with low impact, no deadline, high postpone capability.

**Output Format (STRICT JSON):**
{
  "urgent_important": ["Task Name 1", "Task Name 2"],
  "not_urgent_important": [],
  "urgent_not_important": [],
  "not_urgent_not_important": []
}
`;

    // 3. Call Python AI Service
    let aiResponseText;
    try {
        const pythonUrl = process.env.PYTHON_SERVER_URL || 'http://localhost:8000';
        const response = await axios.post(`${pythonUrl}/api/generate`, {
            prompt: prompt
        });

        if (response.data && response.data.text) {
            aiResponseText = response.data.text;
        } else {
            throw new Error("Invalid response from AI service");
        }
    } catch (error) {
        console.error("AI Service Error:", error.message);
        throw new ApiError(503, "Failed to generate matrix via AI service");
    }

    // 4. Parse JSON
    let matrix;
    try {
        const jsonMatch = aiResponseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No JSON object found in response");
        }
        matrix = JSON.parse(jsonMatch[0]);
    } catch (error) {
        console.error("JSON Parse Error:", error);
        console.error("Raw AI Response:", aiResponseText);
        throw new ApiError(500, "Failed to parse AI response. Please try again.");
    }

    // 5. Validation on Output Structure
    const requiredKeys = ["urgent_important", "not_urgent_important", "urgent_not_important", "not_urgent_not_important"];
    const hasAllKeys = requiredKeys.every(key => Array.isArray(matrix[key]));

    if (!hasAllKeys) {
        throw new ApiError(500, "AI returned invalid structure");
    }

    // 6. Return Response
    return res.status(200).json(
        new ApiResponse(200, matrix, "Eisenhower Matrix generated successfully")
    );
});

module.exports = {
    generateEisenhowerMatrix
};
