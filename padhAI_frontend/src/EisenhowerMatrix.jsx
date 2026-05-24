import React, { useState } from 'react';
import './Eisenhower.css';

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
        <div className="eisenhower-container">
            <h1 style={{ color: '#10612d' }}>AI Eisenhower Matrix</h1>

            <div className={`eisenhower-layout ${matrix ? 'layout-generated' : 'layout-initial'}`}>
                <div className="input-section">
                    <div className="input-content-wrapper">
                        <div className="task-group">
                            <h2>1. List Your Tasks</h2>
                            <textarea
                                className="task-input"
                                placeholder="Enter tasks (one per line)...&#10;Study Physics&#10;Buy Groceries"
                                value={tasks}
                                onChange={handleTaskChange}
                                rows={8}
                            />
                        </div>

                        <div className="questions-group">
                            <h2>2. Reflective Questions</h2>
                            <div className="questions-grid">
                                <input className="q-input" name="q1_deadlines" placeholder="Deadlines?" value={answers.q1_deadlines} onChange={handleAnswerChange} />
                                <input className="q-input" name="q2_goal_impact" placeholder="Goal Impact?" value={answers.q2_goal_impact} onChange={handleAnswerChange} />
                                <input className="q-input" name="q3_postpone" placeholder="Can Postpone?" value={answers.q3_postpone} onChange={handleAnswerChange} />
                                <input className="q-input" name="q4_delegate" placeholder="Can Delegate?" value={answers.q4_delegate} onChange={handleAnswerChange} />
                                <input className="q-input" name="q5_mental_load" placeholder="Mental Load?" value={answers.q5_mental_load} onChange={handleAnswerChange} />
                                <input className="q-input" name="q6_consequences" placeholder="Consequences?" value={answers.q6_consequences} onChange={handleAnswerChange} />
                                <input className="q-input" name="q7_priority_preference" placeholder="Priority Preference?" value={answers.q7_priority_preference} onChange={handleAnswerChange} />
                            </div>

                            <button className="generate-btn" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Analyzing..." : "Generate Matrix"}
                            </button>
                            {error && <p className="error-msg">{error}</p>}
                        </div>
                    </div>
                </div>

                {matrix && (
                    <div className="matrix-display">
                        <div className="quadrant q1">
                            <h3>Urgent & Important (Do Now)</h3>
                            <ul>{matrix.urgent_important.map((t, i) => <li key={i}>{t}</li>)}</ul>
                        </div>
                        <div className="quadrant q2">
                            <h3>Not Urgent & Important (Schedule)</h3>
                            <ul>{matrix.not_urgent_important.map((t, i) => <li key={i}>{t}</li>)}</ul>
                        </div>
                        <div className="quadrant q3">
                            <h3>Urgent & Not Important (Delegate)</h3>
                            <ul>{matrix.urgent_not_important.map((t, i) => <li key={i}>{t}</li>)}</ul>
                        </div>
                        <div className="quadrant q4">
                            <h3>Not Urgent & Not Important (Delete)</h3>
                            <ul>{matrix.not_urgent_not_important.map((t, i) => <li key={i}>{t}</li>)}</ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EisenhowerMatrix;
