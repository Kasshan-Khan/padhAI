import React, { useState, useEffect } from 'react';

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
            const firstSession = schedule.schedule[0];
            if (firstSession) {
                setTimeLeft(firstSession.focus_minutes * 60);
            }
        } else if (timeLeft === 0) {
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
            sendNotification("Pomodoro Complete! 👏", `Great job on ${currentSession.task}. Take a break!`);
            if (currentSession.break_minutes > 0) {
                setIsBreak(true);
                setTimeLeft(currentSession.break_minutes * 60);
            } else {
                nextSession();
            }
        } else {
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

    const currentSession = schedule?.schedule?.[currentSessionIndex];
    const currentTaskName = currentSession?.task || "Session";
    
    // Calculate progress for radial timer
    const totalCurrentDuration = isBreak 
        ? (currentSession?.break_minutes || 5) * 60 
        : (currentSession?.focus_minutes || 25) * 60;
    const progressPercentage = totalCurrentDuration > 0 ? ((totalCurrentDuration - timeLeft) / totalCurrentDuration) * 100 : 0;

    return (
        <div className="w-full flex flex-col items-center gap-10">
            {/* Input Section */}
            <div className={`w-full transition-all duration-700 ease-in-out ${schedule ? 'opacity-80 scale-95 max-w-4xl' : 'opacity-100 scale-100 max-w-2xl'}`}>
                <div className="card bg-base-100/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_rgba(16,97,45,0.2)] border border-base-300 relative overflow-hidden transition-shadow duration-500 hover:-translate-y-2 animate-fade-in-up">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent/20 via-transparent to-primary/20 blur-2xl -z-10"></div>
                    
                    <div className="card-body p-8">
                        <h2 className="text-3xl font-extrabold mb-6 flex items-center justify-center gap-3 drop-shadow-sm">
                            <span className="text-primary animate-pulse">⏱️</span> AI Study Planner
                        </h2>

                        <div className="flex flex-col gap-6">
                            <div className="form-control w-full">
                                <label className="label font-bold text-base-content/80 text-lg">Available Hours</label>
                                <input
                                    type="number"
                                    className="input input-lg input-bordered input-primary bg-base-200/50 focus:bg-base-100 transition-all text-xl font-bold shadow-inner"
                                    placeholder="e.g. 4"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label font-bold text-base-content/80 text-lg">Tasks to Complete</label>
                                <textarea
                                    className="textarea textarea-bordered textarea-primary bg-base-200/50 focus:bg-base-100 transition-all text-lg resize-none shadow-inner h-32"
                                    placeholder="Physics Chapter 1&#10;Chemistry Revision"
                                    value={tasks}
                                    onChange={(e) => setTasks(e.target.value)}
                                />
                            </div>

                            <button 
                                className="btn btn-primary btn-lg rounded-full mt-4 shadow-[0_0_20px_rgba(16,97,45,0.5)] hover:shadow-[0_0_30px_rgba(16,97,45,0.8)] border-none text-lg tracking-wide group relative overflow-hidden" 
                                onClick={handleSubmit} 
                                disabled={loading}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                {loading ? <span className="loading loading-spinner loading-md"></span> : "Generate AI Plan"}
                            </button>
                            {error && <p className="text-error text-center font-medium mt-2 animate-bounce">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timer & Output Section */}
            {schedule && schedule.schedule && schedule.schedule.length > 0 && (
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
                    
                    {/* Left: Timer Display */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center">
                        <div className="card bg-base-100/40 backdrop-blur-xl border border-base-300 shadow-2xl p-10 flex flex-col items-center w-full relative overflow-hidden">
                            
                            {/* Glowing effect behind timer */}
                            <div className={`absolute inset-0 blur-3xl opacity-30 transition-colors duration-1000 -z-10 ${isBreak ? 'bg-info' : 'bg-error'}`}></div>

                            <h3 className="text-2xl font-bold mb-8 text-base-content tracking-wide drop-shadow-sm">
                                {isBreak ? "Break Time ☕" : "Deep Focus 🧠"}
                            </h3>

                            {/* Neon Radial Progress */}
                            <div 
                                className={`radial-progress transition-all duration-1000 ease-in-out font-mono text-5xl font-bold drop-shadow-lg shadow-inner ${isBreak ? 'text-info' : 'text-error'}`} 
                                style={{ "--value": progressPercentage, "--size": "16rem", "--thickness": "1rem" }} 
                                role="progressbar"
                            >
                                {formatTime(timeLeft)}
                            </div>

                            <p className="mt-8 text-lg font-medium text-base-content/80 text-center px-4">
                                {isBreak ? "Relax, stretch, and grab water." : `Working on: ${currentTaskName}`}
                            </p>

                            <div className="mt-8 flex gap-4">
                                {!timerActive ? (
                                    <button className={`btn btn-lg rounded-full px-10 shadow-lg ${isBreak ? 'btn-info shadow-info/40' : 'btn-error shadow-error/40'}`} onClick={startTimer}>
                                        ▶ Start
                                    </button>
                                ) : (
                                    <button className="btn btn-neutral btn-lg rounded-full px-10 shadow-lg" onClick={pauseTimer}>
                                        ⏸ Pause
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 w-full mt-6">
                            <div className="flex-1 bg-base-100/60 backdrop-blur-md rounded-2xl p-4 text-center border border-base-300 shadow-md">
                                <div className="text-sm font-bold text-base-content/50 uppercase tracking-wider">Total Sessions</div>
                                <div className="text-3xl font-extrabold text-primary drop-shadow-sm">{schedule.schedule.length}</div>
                            </div>
                            <div className="flex-1 bg-base-100/60 backdrop-blur-md rounded-2xl p-4 text-center border border-base-300 shadow-md">
                                <div className="text-sm font-bold text-base-content/50 uppercase tracking-wider">Focus Time</div>
                                <div className="text-3xl font-extrabold text-accent drop-shadow-sm">{schedule.schedule.reduce((acc, curr) => acc + (curr.focus_minutes || 0), 0)}m</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Timeline */}
                    <div className="lg:col-span-7 bg-base-100/40 backdrop-blur-xl border border-base-300 shadow-2xl rounded-3xl p-8 max-h-[700px] overflow-y-auto custom-scrollbar relative">
                        <h3 className="text-2xl font-bold mb-6 text-base-content/80 sticky top-0 bg-base-100/80 backdrop-blur-md py-2 z-10 border-b border-base-200">Session Timeline</h3>
                        <ul className="steps steps-vertical w-full">
                            {schedule.schedule.map((session, index) => {
                                const isPast = index < currentSessionIndex;
                                const isCurrent = index === currentSessionIndex;
                                return (
                                    <li 
                                        key={index} 
                                        className={`step ${isPast ? 'step-primary' : isCurrent ? (isBreak ? 'step-info animate-pulse' : 'step-error animate-pulse') : ''}`}
                                    >
                                        <div className={`w-full text-left ml-4 mb-8 transition-all duration-500 ${isCurrent ? 'scale-105' : isPast ? 'opacity-50' : 'opacity-80'}`}>
                                            <div className={`card shadow-md border ${isCurrent && !isBreak ? 'border-error/50 bg-error/10' : 'border-base-300 bg-base-100/80'}`}>
                                                <div className="card-body p-5">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className={`text-lg font-bold ${isPast ? 'line-through text-base-content/50' : 'text-base-content'}`}>{session.task}</h4>
                                                        <div className="badge badge-primary badge-outline">Focus: {session.focus_minutes}m</div>
                                                    </div>
                                                    {session.note && <p className="text-sm text-base-content/70 italic bg-base-200/50 p-2 rounded-lg">{session.note}</p>}
                                                </div>
                                            </div>

                                            {session.break_minutes > 0 && (
                                                <div className={`card shadow-sm border mt-3 ${isCurrent && isBreak ? 'border-info/50 bg-info/10' : 'border-base-200 bg-base-200/30'}`}>
                                                    <div className="card-body p-3 flex flex-row justify-between items-center">
                                                        <span className="font-medium text-base-content/70">☕ Break Time</span>
                                                        <div className="badge badge-info badge-outline">Rest: {session.break_minutes}m</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PomodoroPlanner;
