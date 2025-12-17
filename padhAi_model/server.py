from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi
import re

load_dotenv()

app = Flask(__name__)
CORS(app)

# Validate API key
if not os.getenv("GOOGLE_API_KEY"):
    print("ERROR: Google API Key not found")
    exit(1)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

prompt = """You are YouTube video summarizer. You will be taking the transcript text
and summarizing the entire video and providing the important summary in points
within 250 words. Please provide the summary of the text given here: """

def extract_video_id(youtube_url):
    """Extract video ID from YouTube URL"""
    if not youtube_url:
        return None
        
    patterns = [
        r'(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/)([a-zA-Z0-9_-]{11})',
        r'youtube\.com/watch.*v=([a-zA-Z0-9_-]{11})'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, youtube_url)
        if match:
            return match.group(1)
    
    return None

def extract_transcript_details(youtube_video_url):
    try:
        video_id = extract_video_id(youtube_video_url)
        if not video_id:
            raise ValueError("Invalid YouTube URL format")
            
        transcript_text = YouTubeTranscriptApi().fetch(video_id, languages=['en','hi'])

        transcript = ""
        for i in transcript_text:
            transcript += " " + i.text

        return transcript

    except Exception as e:
        raise e

def generate_gemini_content(transcript_text, prompt):
    model = genai.GenerativeModel("gemini-2.5-flash-lite")
    response = model.generate_content(prompt + transcript_text)
    return response.text

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "python-model-server"})

@app.route('/api/transcript/summary', methods=['POST'])
def get_transcript_summary():
    try:
        data = request.get_json()
        
        if not data or 'youtube_url' not in data:
            return jsonify({"error": "YouTube URL is required"}), 400
            
        youtube_url = data['youtube_url']
        
        # Extract transcript
        transcript_text = extract_transcript_details(youtube_url)
        
        if not transcript_text:
            return jsonify({"error": "No transcript available for this video"}), 404
            
        # Generate summary
        summary = generate_gemini_content(transcript_text, prompt)
        
        return jsonify({
            "success": True,
            "summary": summary,
            "transcript_length": len(transcript_text)
        })
        
    except Exception as e:
        return jsonify({
            "error": f"An error occurred: {str(e)}"
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
