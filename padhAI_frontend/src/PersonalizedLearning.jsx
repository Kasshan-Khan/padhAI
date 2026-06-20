import React, { useState } from 'react';
import EisenhowerMatrix from './EisenhowerMatrix';
import PomodoroPlanner from './PomodoroPlanner';

const PersonalizedLearning = () => {
    const [activeTool, setActiveTool] = useState("eisenhower");

    return (
        <div className="min-h-screen bg-base-200 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            
            <div className="text-center mb-8 w-full max-w-4xl">
                <h1 className="text-4xl font-extrabold text-base-content mb-3 drop-shadow-sm">Personalized Learning Space</h1>
                <p className="text-lg text-base-content/70">Select your productivity tool below to organize your studies</p>
                
                <div className="join mt-6 bg-base-100 shadow-md rounded-full p-1 border border-base-300">
                    <button
                        className={`join-item btn btn-ghost rounded-full px-8 text-lg ${activeTool === 'eisenhower' ? 'bg-primary text-primary-content hover:bg-primary-focus shadow-inner' : 'hover:bg-base-200'}`}
                        onClick={() => setActiveTool('eisenhower')}
                    >
                        ⚡ Priority Matrix
                    </button>
                    <button
                        className={`join-item btn btn-ghost rounded-full px-8 text-lg ${activeTool === 'pomodoro' ? 'bg-primary text-primary-content hover:bg-primary-focus shadow-inner' : 'hover:bg-base-200'}`}
                        onClick={() => setActiveTool('pomodoro')}
                    >
                        ⏱️ Pomodoro Planner
                    </button>
                </div>
            </div>

            <div className="w-full max-w-6xl animate-fade-in-up">
                {activeTool === 'eisenhower' ? (
                    <div key="eisenhower" className="w-full">
                        <EisenhowerMatrix />
                    </div>
                ) : (
                    <div key="pomodoro" className="w-full">
                        <PomodoroPlanner />
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default PersonalizedLearning;
