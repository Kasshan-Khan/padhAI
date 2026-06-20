import React, { useState } from 'react';

const EisenhowerMatrix = () => {
    const [tasks, setTasks] = useState("");
    const [answers, setAnswers] = useState({
        q1_deadlines: "",
        q2_goal_impact: "",
        q3_postpone: "",
        q4_delegate: "",
        q5_mental_load: "",
        q6_consequences: "",
        q7_priority_preference: ""
    });
    const [matrix, setMatrix] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTaskChange = (e) => setTasks(e.target.value);

    const handleAnswerChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMatrix(null);

        const taskList = tasks.split('\n').filter(t => t.trim() !== "");

        if (taskList.length === 0) {
            setError("Please enter at least one task.");
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/eisenhower/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    tasks: taskList,
                    answers: answers
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMatrix(data.data);
            } else {
                setError(data.message || "Failed to generate matrix");
            }
        } catch (err) {
            console.error(err);
            setError("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-10">
            {/* Input Section */}
            <div className={`w-full transition-all duration-700 ease-in-out ${matrix ? 'opacity-80 scale-95 max-w-4xl' : 'opacity-100 scale-100 max-w-6xl'}`}>
                <div className="card bg-base-100/60 backdrop-blur-2xl shadow-2xl border border-base-300 relative overflow-hidden">
                    {/* Glowing Border Beam Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent to-secondary opacity-20 blur-xl animate-pulse -z-10"></div>
                    
                    <div className="card-body p-8">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-primary">⚡</span> 
                            <span>AI Priority Engine</span>
                        </h2>

                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="flex-1">
                                <label className="label font-bold text-base-content/80">1. Brain-Dump Your Tasks</label>
                                <textarea
                                    className="textarea textarea-bordered textarea-primary w-full h-48 bg-base-200/50 focus:bg-base-100 transition-all text-lg resize-none shadow-inner"
                                    placeholder="Enter tasks (one per line)...&#10;Study Physics Chapter 1&#10;Email Professor&#10;Buy Groceries"
                                    value={tasks}
                                    onChange={handleTaskChange}
                                />
                            </div>

                            <div className="flex-1 flex flex-col gap-4">
                                <label className="label font-bold text-base-content/80">2. Context & Reflection (Optional)</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-48 overflow-y-auto pr-2 custom-scrollbar">
                                    <input className="input input-sm input-bordered w-full bg-base-200/50 focus:border-primary" name="q1_deadlines" placeholder="Any hard deadlines?" value={answers.q1_deadlines} onChange={handleAnswerChange} />
                                    <input className="input input-sm input-bordered w-full bg-base-200/50 focus:border-primary" name="q2_goal_impact" placeholder="High impact on goals?" value={answers.q2_goal_impact} onChange={handleAnswerChange} />
                                    <input className="input input-sm input-bordered w-full bg-base-200/50 focus:border-primary" name="q3_postpone" placeholder="Can it wait?" value={answers.q3_postpone} onChange={handleAnswerChange} />
                                    <input className="input input-sm input-bordered w-full bg-base-200/50 focus:border-primary" name="q4_delegate" placeholder="Can you delegate?" value={answers.q4_delegate} onChange={handleAnswerChange} />
                                    <input className="input input-sm input-bordered w-full bg-base-200/50 focus:border-primary" name="q5_mental_load" placeholder="High mental load?" value={answers.q5_mental_load} onChange={handleAnswerChange} />
                                    <input className="input input-sm input-bordered w-full bg-base-200/50 focus:border-primary" name="q6_consequences" placeholder="Consequences of ignoring?" value={answers.q6_consequences} onChange={handleAnswerChange} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col items-center">
                            <button 
                                className="btn btn-primary btn-lg rounded-full w-full sm:w-80 shadow-[0_0_20px_rgba(16,97,45,0.5)] hover:shadow-[0_0_30px_rgba(16,97,45,0.8)] border-none text-lg tracking-wide group relative overflow-hidden" 
                                onClick={handleSubmit} 
                                disabled={loading}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                {loading ? <span className="loading loading-spinner loading-md"></span> : "Generate Matrix"}
                            </button>
                            {error && <p className="text-error mt-4 font-medium animate-pulse">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Matrix Output Section */}
            {matrix && (
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
                    
                    {/* Quadrant 1 */}
                    <div className="card bg-error/10 border border-error/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,0,0,0.2)] hover:border-error/50 transition-all duration-500 group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-error/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="card-body relative z-10">
                            <h3 className="card-title text-error font-extrabold text-xl mb-4 border-b border-error/20 pb-2">
                                🔥 Urgent & Important
                                <span className="text-xs font-normal ml-auto badge badge-error badge-outline">Do Now</span>
                            </h3>
                            <ul className="space-y-2">
                                {matrix.urgent_important.map((t, i) => (
                                    <li key={i} className="flex items-start gap-3 bg-base-100/50 p-3 rounded-xl shadow-sm border border-base-200">
                                        <input type="checkbox" className="checkbox checkbox-error checkbox-sm mt-1 rounded-full" />
                                        <span className="text-base-content/90 font-medium">{t}</span>
                                    </li>
                                ))}
                                {matrix.urgent_important.length === 0 && <p className="text-base-content/40 italic">No tasks here.</p>}
                            </ul>
                        </div>
                    </div>

                    {/* Quadrant 2 */}
                    <div className="card bg-info/10 border border-info/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,200,255,0.2)] hover:border-info/50 transition-all duration-500 group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-info/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="card-body relative z-10">
                            <h3 className="card-title text-info font-extrabold text-xl mb-4 border-b border-info/20 pb-2">
                                📅 Not Urgent & Important
                                <span className="text-xs font-normal ml-auto badge badge-info badge-outline">Schedule</span>
                            </h3>
                            <ul className="space-y-2">
                                {matrix.not_urgent_important.map((t, i) => (
                                    <li key={i} className="flex items-start gap-3 bg-base-100/50 p-3 rounded-xl shadow-sm border border-base-200">
                                        <input type="checkbox" className="checkbox checkbox-info checkbox-sm mt-1 rounded-full" />
                                        <span className="text-base-content/90 font-medium">{t}</span>
                                    </li>
                                ))}
                                {matrix.not_urgent_important.length === 0 && <p className="text-base-content/40 italic">No tasks here.</p>}
                            </ul>
                        </div>
                    </div>

                    {/* Quadrant 3 */}
                    <div className="card bg-warning/10 border border-warning/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,165,0,0.2)] hover:border-warning/50 transition-all duration-500 group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-warning/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="card-body relative z-10">
                            <h3 className="card-title text-warning font-extrabold text-xl mb-4 border-b border-warning/20 pb-2">
                                🤝 Urgent & Not Important
                                <span className="text-xs font-normal ml-auto badge badge-warning badge-outline">Delegate</span>
                            </h3>
                            <ul className="space-y-2">
                                {matrix.urgent_not_important.map((t, i) => (
                                    <li key={i} className="flex items-start gap-3 bg-base-100/50 p-3 rounded-xl shadow-sm border border-base-200">
                                        <input type="checkbox" className="checkbox checkbox-warning checkbox-sm mt-1 rounded-full" />
                                        <span className="text-base-content/90 font-medium">{t}</span>
                                    </li>
                                ))}
                                {matrix.urgent_not_important.length === 0 && <p className="text-base-content/40 italic">No tasks here.</p>}
                            </ul>
                        </div>
                    </div>

                    {/* Quadrant 4 */}
                    <div className="card bg-base-200/50 border border-base-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-base-content/30 transition-all duration-500 group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-base-content/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="card-body relative z-10">
                            <h3 className="card-title text-base-content/70 font-extrabold text-xl mb-4 border-b border-base-300 pb-2">
                                🗑️ Not Urgent & Not Important
                                <span className="text-xs font-normal ml-auto badge badge-ghost">Delete</span>
                            </h3>
                            <ul className="space-y-2">
                                {matrix.not_urgent_not_important.map((t, i) => (
                                    <li key={i} className="flex items-start gap-3 bg-base-100/30 p-3 rounded-xl shadow-sm border border-base-200 opacity-60 line-through">
                                        <span className="text-base-content/60 font-medium">{t}</span>
                                    </li>
                                ))}
                                {matrix.not_urgent_not_important.length === 0 && <p className="text-base-content/40 italic">No tasks here.</p>}
                            </ul>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default EisenhowerMatrix;
