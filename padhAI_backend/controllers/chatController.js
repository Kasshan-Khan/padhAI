const axios = require('axios');

const handleChat = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Build prompt with context and history
        let prompt = "You are Banku, a friendly, encouraging, and intelligent AI tutor.\n";
        prompt += "Your goal is to help students with their studies, answer queries, explain concepts, and give tips.\n";
        prompt += "Keep your answers clear, concise (under 250 words), and easy to read. Use bullet points where appropriate.\n\n";

        if (history && Array.isArray(history) && history.length > 0) {
            prompt += "Conversation history:\n";
            history.forEach(chat => {
                const roleName = chat.role === "user" ? "User" : "AI";
                prompt += `${roleName}: ${chat.text}\n`;
            });
            prompt += "\n";
        }

        prompt += `User: ${message}\n`;
        prompt += "AI:";

        // Call the running python-model server's generate endpoint
        const pythonUrl = process.env.PYTHON_SERVER_URL || 'http://localhost:8000';
        const response = await axios.post(`${pythonUrl}/api/generate`, {
            prompt: prompt
        });

        if (response.data && response.data.success) {
            res.json({
                success: true,
                reply: response.data.text
            });
        } else {
            throw new Error("Failed to get response from AI model server");
        }

    } catch (error) {
        console.error("Error in chatController:", error.message);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({
                error: "Failed to connect to model server",
                details: error.message
            });
        }
    }
};

module.exports = { handleChat };
