import streamlit as st
from dotenv import load_dotenv
import re
from urllib.parse import urlparse, parse_qs
import requests

load_dotenv() ##load all the nevironment variables
import os
import google.generativeai as genai

from youtube_transcript_api import YouTubeTranscriptApi

# Validate API key
if not os.getenv("GOOGLE_API_KEY"):
    st.error("Google API Key not found. Please set GOOGLE_API_KEY in your environment variables.")
    st.stop()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

prompt="""You are Yotube video summarizer. You will be taking the transcript text
and summarizing the entire video and providing the important summary in points
within 250 words. Please provide the summary of the text given here:  """


## getting the transcript data from yt videos
def extract_transcript_details(youtube_video_url):
    try:
        video_id = extract_video_id(youtube_video_url)
        if not video_id:
            raise ValueError("Invalid YouTube URL format")
            
        print(video_id)
        
        transcript_text=YouTubeTranscriptApi().fetch(video_id, languages=['en','hi'])

        transcript = ""
        for i in transcript_text:
            transcript += " " + i.text

        return transcript

    except Exception as e:
        raise e

def extract_video_id(youtube_url):
    """Extract video ID from YouTube URL"""
    if not youtube_url:
        return None
        
    # Handle different YouTube URL formats
    patterns = [
        r'(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/)([a-zA-Z0-9_-]{11})',
        r'youtube\.com/watch.*v=([a-zA-Z0-9_-]{11})'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, youtube_url)
        if match:
            return match.group(1)
    
    return None
    
## getting the summary based on Prompt from Google Gemini Pro
def generate_gemini_content(transcript_text,prompt):

    model=genai.GenerativeModel("gemini-2.5-flash-lite")
    response=model.generate_content(prompt+transcript_text)
    return response.text

st.title("YouTube Transcript to Detailed Notes Converter")
youtube_link = st.text_input("Enter YouTube Video Link:")

if youtube_link:
    video_id = extract_video_id(youtube_link)
    if video_id:
        print(video_id)
        st.image(f"http://img.youtube.com/vi/{video_id}/0.jpg", use_column_width=True)
    else:
        st.warning("Please enter a valid YouTube URL")

if st.button("Get Detailed Notes"):
    if not youtube_link:
        st.error("Please enter a YouTube URL")
    else:
        with st.spinner("Extracting transcript and generating summary..."):
            try:
                # Call Node.js backend API
                response = requests.post(
                    "http://localhost:5000/api/transcript/summary",
                    json={"youtube_url": youtube_link},
                    headers={"Content-Type": "application/json"}
                )
                
                if response.status_code == 200:
                    result = response.json()
                    if result.get("success"):
                        st.markdown("## Detailed Notes:")
                        st.write(result.get("summary"))
                        st.info(f"Transcript length: {result.get('transcript_length', 0)} characters")
                    else:
                        st.error(result.get("error", "Unknown error occurred"))
                else:
                    error_data = response.json() if response.headers.get('content-type') == 'application/json' else {}
                    st.error(f"Error {response.status_code}: {error_data.get('error', 'Failed to process request')}")
                    
            except requests.exceptions.ConnectionError:
                st.error("Cannot connect to backend server. Please ensure the Node.js server is running on localhost:5000")
            except requests.exceptions.Timeout:
                st.error("Request timed out. Please try again.")
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")




