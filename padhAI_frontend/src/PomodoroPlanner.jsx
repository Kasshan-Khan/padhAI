import React, { useState, useEffect } from 'react';
import './Pomodoro.css';

const PomodoroPlanner = () => {
    const [hours, setHours] = useState("");
    const [tasks, setTasks] = useState("");
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [timerActive, setTimerActive] = useState(false);
    const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
    const [isBreak, setIsBreak] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [permission, setPermission] = useState("default");

    useEffect(() => {
        if (typeof window !== 'undefined' && "Notification" in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = async () => {
        if (typeof window !== 'undefined' && "Notification" in window) {
            try {
                const perm = await Notification.requestPermission();
                setPermission(perm);
            } catch (e) {
                console.error("Notification permission error", e);
            }
        }
    };

    const sendNotification = (title, body) => {
        if (typeof window !== 'undefined' && "Notification" in window && permission === "granted") {
            try {
                new Notification(title, { body });
            } catch (e) {
                console.error("Notification error", e);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSchedule(null);
        setTimerActive(false);
        setCurrentSessionIndex(0);
        setIsBreak(false);
        setTimeLeft(0);

        const taskList = tasks.split('\n').filter(t => t.trim() !== "");

        if (!hours || isNaN(hours) || Number(hours) <= 0) {
            setError("Please enter valid available hours.");
            setLoading(false);
            return;
        }

        if (taskList.length === 0) {
            setError("Please enter at least one task.");
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pomodoro/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    available_hours: Number(hours),
                    tasks: taskList
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSchedule(data.data);
            } else {
                setError(data.message || "Failed to generate plan");
            }
        } catch (err) {
            console.error(err);
            setError("Server error");
        } finally {
            setLoading(false);
        }
    };

    const startTimer = () => {
        if (!schedule?.schedule?.[0]) return;

        if (timeLeft === 0 && !isBreak && currentSessionIndex === 0) {
            // Initialize first session
            const firstSession = schedule.schedule[0];
            if (firstSession) {
                setTimeLeft(firstSession.focus_minutes * 60);
            }
        } else if (timeLeft === 0) {
            // Logic to handle restart of a session if needed
            const currentSession = schedule.schedule[currentSessionIndex];
            if (currentSession) {
                setTimeLeft(isBreak ? (currentSession.break_minutes || 5) * 60 : (currentSession.focus_minutes || 25) * 60);
            }
        }

        setTimerActive(true);
        if (permission === "default") requestPermission();
    };

    const pauseTimer = () => setTimerActive(false);

    useEffect(() => {
        let interval = null;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && timerActive) {
            handleSessionComplete();
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const handleSessionComplete = () => {
        if (!schedule?.schedule) return;
        const currentSession = schedule.schedule[currentSessionIndex];
        if (!currentSession) return;

        if (!isBreak) {
            // Finished Focus
            sendNotification("Pomodoro Complete! 👏", `Great job on ${currentSession.task}. Take a break!`);
            if (currentSession.break_minutes > 0) {
                setIsBreak(true);
                setTimeLeft(currentSession.break_minutes * 60);
            } else {
                nextSession();
            }
        } else {
            // Finished Break
            sendNotification("Break Over ⏰", "Time to get back to work!");
            setIsBreak(false);
            nextSession();
        }
    };

    const nextSession = () => {
        if (!schedule?.schedule) return;

        if (currentSessionIndex < schedule.schedule.length - 1) {
            const nextIdx = currentSessionIndex + 1;
            setCurrentSessionIndex(nextIdx);
            const nextSessionData = schedule.schedule[nextIdx];
            if (nextSessionData) {
                setTimeLeft((nextSessionData.focus_minutes || 25) * 60);
            }
        } else {
            setTimerActive(false);
            sendNotification("All Done! 🎉", "You completed your study plan!");
            alert("Plan Completed! Great job!");
        }
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds) || seconds < 0) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Safety check for current session display
    const currentSession = schedule?.schedule?.[currentSessionIndex];
    const currentTaskName = currentSession?.task || "Session";

    return (
        <div className="pomodoro-container">
            <h1 className="pomodoro-title">AI Pomodoro Planner</h1>

            <div className={`pomodoro-layout ${schedule ? 'layout-generated' : 'layout-initial'}`}>
                <div className="input-section">
                    <div className="input-group">
                        <label>Available Hours</label>
                        <input
                            type="number"
                            className="pomodoro-input"
                            placeholder="e.g. 4"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Tasks to Complete</label>
                        <textarea
                            className="pomodoro-textarea"
                            placeholder="Physics Chapter 1&#10;Chemistry Revision"
                            rows={6}
                            value={tasks}
                            onChange={(e) => setTasks(e.target.value)}
                        />
                    </div>

                    <button className="generate-btn" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Generating Plan..." : "Create Schedule"}
                    </button>
                    {error && <p className="error-msg">{error}</p>}
                </div>

                {schedule && schedule.schedule && schedule.schedule.length > 0 && (
                    <div className="schedule-display">
                        <div className="timer-section">
                            <div className={`timer-display ${timerActive ? 'active' : ''}`}>
                                <h2>{isBreak ? "Break Time ☕" : "Focus Time 🧠"}</h2>
                                <div className="time-large">{formatTime(timeLeft)}</div>
                                <p className="current-task-label">
                                    {isBreak ? "Relax & Recharge" : `Current: ${currentTaskName}`}
                                </p>
                                <div className="timer-controls">
                                    {!timerActive ? (
                                        <button className="timer-btn start" onClick={startTimer}>Start Session</button>
                                    ) : (
                                        <button className="timer-btn pause" onClick={pauseTimer}>Pause</button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="plan-summary">
                            <div className="summary-card">
                                <span>Total Sessions</span>
                                <h3>{schedule.schedule.length}</h3>
                            </div>
                            <div className="summary-card">
                                <span>Focus Time</span>
                                <h3>{schedule.schedule.reduce((acc, curr) => acc + (curr.focus_minutes || 0), 0)} min</h3>
                            </div>
                        </div>

                        <div className="timeline">
                            {schedule.schedule.map((session, index) => (
                                <div key={index} className={`timeline-item ${index === currentSessionIndex ? 'active-item' : ''} ${index < currentSessionIndex ? 'completed-item' : ''}`}>
                                    <div className="time-marker">Session {session.session}</div>
                                    <div className={`session-card focus ${index === currentSessionIndex && !isBreak ? 'active-card' : ''}`}>
                                        <h4>{session.task}</h4>
                                        <div className="tag focus-tag">Focus: {session.focus_minutes}m</div>
                                        {session.note && <p className="note">{session.note}</p>}
                                    </div>
                                    {session.break_minutes > 0 && (
                                        <div className={`session-card break ${index === currentSessionIndex && isBreak ? 'active-card' : ''}`}>
                                            <h4>Take a Break ☕</h4>
                                            <div className="tag break-tag">Rest: {session.break_minutes}m</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PomodoroPlanner;
