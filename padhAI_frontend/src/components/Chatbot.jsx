import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import bankuLogo from "../assets/banku_logo.png";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Hello! I am Banku, your personal AI tutor. Ask me anything about your syllabus, study planning, or tough concepts!"
        }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);

    const messagesEndRef = useRef(null);

    // Setup Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (recognition) {
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };
        recognition.onend = () => {
            setIsListening(false);
        };
    }

    const toggleListening = () => {
        if (!recognition) {
            alert("Your browser does not support voice input.");
            return;
        }
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    // Text to Speech Function
    const speakText = (text) => {
        if (!voiceEnabled || !window.speechSynthesis) return;
        
        window.speechSynthesis.cancel();
        
        // Clean up markdown before speaking
        const cleanText = text.replace(/[*#]/g, '').replace(/```[\s\S]*?```/g, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-GB'));
        if (englishVoice) utterance.voice = englishVoice;
        
        utterance.rate = 1.05;
        utterance.pitch = 1.05;
        window.speechSynthesis.speak(utterance);
    };

    // Stop speaking when chatbot is closed
    useEffect(() => {
        if (!isOpen && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }, [isOpen]);

    const suggestions = [
        "Give me study tips",
        "Explain Dynamic Programming",
        "Create a study schedule"
    ];

    // Scroll to bottom on new messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSend = async (textToSend) => {
        const text = textToSend || input;
        if (!text.trim()) return;

        if (!textToSend) {
            setInput("");
        }

        // Add user message
        const newMessages = [...messages, { sender: "user", text }];
        setMessages(newMessages);
        setLoading(true);

        try {
            // Build conversation history (exclude initial message for cleaner prompts if desired)
            const history = messages.slice(1).map(msg => ({
                role: msg.sender === "user" ? "user" : "assistant",
                text: msg.text
            }));

            const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, "");
            const res = await fetch(`${API_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: text,
                    history: history
                })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setMessages(prev => [...prev, { sender: "ai", text: data.reply }]);
                speakText(data.reply);
            } else {
                setMessages(prev => [...prev, { 
                    sender: "ai", 
                    text: "I encountered an error trying to process that request. Please try again." 
                }]);
            }
        } catch (error) {
            console.error("Chatbot connection error:", error);
            setMessages(prev => [...prev, { 
                sender: "ai", 
                text: "Unable to connect to the PadhAI server. Please ensure the backend and model servers are running." 
            }]);
        } finally {
            setLoading(false);
        }
    };

    // Helper to render markdown-like lists and newlines simply in React
    const formatMessageText = (text) => {
        return text.split("\n").map((line, idx) => {
            if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
                return <li key={idx} style={{ marginLeft: "10px", listStyleType: "disc" }}>{line.substring(2)}</li>;
            }
            if (/^\d+\.\s/.test(line.trim())) {
                const match = line.match(/^\d+\.\s/);
                return <li key={idx} style={{ marginLeft: "10px", listStyleType: "decimal" }}>{line.substring(match[0].length)}</li>;
            }
            return <p key={idx} style={{ margin: "2px 0" }}>{line}</p>;
        });
    };

    return (
        <>
            {/* Floating Bubble Button */}
            {!isOpen && (
                <button className="chatbot-bubble" onClick={() => setIsOpen(true)} style={{ padding: 0 }}>
                    <img src={bankuLogo} alt="Banku" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                </button>
            )}

            {/* Chatbot Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-header-info">
                            <h3 className="chatbot-title" style={{ gap: "10px", alignItems: "center" }}>
                                <img src={bankuLogo} alt="Banku" style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(255, 255, 255, 0.5)" }} />
                                Banku
                            </h3>
                            <div className="chatbot-status">
                                <span className="status-dot"></span> Online
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <button 
                                className="chatbot-voice-toggle" 
                                onClick={() => {
                                    setVoiceEnabled(!voiceEnabled);
                                    if (voiceEnabled) window.speechSynthesis.cancel();
                                }}
                                title={voiceEnabled ? "Mute Banku" : "Unmute Banku"}
                                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', padding: '0 5px' }}
                            >
                                {voiceEnabled ? '🔊' : '🔇'}
                            </button>
                            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>&times;</button>
                        </div>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-bubble ${msg.sender}`}>
                                {formatMessageText(msg.text)}
                            </div>
                        ))}
                        {loading && (
                            <div className="message-bubble ai">
                                <div className="typing-indicator">
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions list */}
                    <div className="chatbot-suggestions">
                        {suggestions.map((sug, idx) => (
                            <button 
                                key={idx} 
                                className="suggestion-chip" 
                                onClick={() => handleSend(sug)}
                                disabled={loading}
                            >
                                {sug}
                            </button>
                        ))}
                    </div>

                    <div className="chatbot-footer">
                        <input
                            type="text"
                            className="chatbot-input"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSend();
                            }}
                            disabled={loading}
                        />
                        <button 
                            className={`chatbot-mic-btn ${isListening ? 'listening' : ''}`}
                            onClick={toggleListening}
                            disabled={loading}
                            title="Speak"
                        >
                            <svg viewBox="0 0 24 24" fill={isListening ? "#ff4444" : "currentColor"}>
                                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                            </svg>
                        </button>
                        <button 
                            className="chatbot-send-btn" 
                            onClick={() => handleSend()}
                            disabled={!input.trim() || loading}
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
