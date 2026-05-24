import React, { useState } from 'react';
import EisenhowerMatrix from './EisenhowerMatrix';
import PomodoroPlanner from './PomodoroPlanner';
import './PersonalizedLearning.css';

const PersonalizedLearning = () => {
    const [activeTool, setActiveTool] = useState("eisenhower");

    return (
        <div className="learning-hub-container">
            <div className="hub-header">
                <h1>Personalized Learning Space</h1>
                <p>Select your productivity tool below</p>

                <div className="tool-selector">
                    <select
                        value={activeTool}
                        onChange={(e) => setActiveTool(e.target.value)}
                        className="hub-dropdown"
                    >
                        <option value="eisenhower">Priority Matrix (Eisenhower)</option>
                        <option value="pomodoro">Pomodoro Study Planner</option>
                    </select>
                </div>
            </div>

            <div className="tool-content-wrapper">
                {activeTool === 'eisenhower' ? (
                    <div className="tool-frame fade-in">
                        <EisenhowerMatrix />
                    </div>
                ) : (
                    <div className="tool-frame fade-in">
                        <PomodoroPlanner />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonalizedLearning;
