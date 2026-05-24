const axios = require('axios');

const YoutubeTranscript = async (req, res) => {
    try {
        const { youtube_url } = req.body;
        
        if (!youtube_url) {
            return res.status(400).json({ error: 'YouTube URL is required' });
        }

        // Call Python model server
        const response = await axios.post('http://localhost:8000/api/transcript/summary', {
            youtube_url
        });

        res.json(response.data);
        
    } catch (error) {
        console.error('Error processing transcript:', error.message);
        
        if (error.response) {
            // Error from Python server
            res.status(error.response.status).json(error.response.data);
        } else {
            // Network error or other issue
            res.status(500).json({ 
                error: 'Failed to connect to model server',
                details: error.message 
            });
        }
    }
};

module.exports = { YoutubeTranscript };
