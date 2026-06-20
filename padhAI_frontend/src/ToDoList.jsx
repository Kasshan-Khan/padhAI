import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="min-h-screen bg-base-200 pt-24 pb-12 px-4 flex flex-col items-center">
      <div className="card w-full max-w-2xl bg-base-100 shadow-2xl border-t-4 border-primary">
        <div className="card-body">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <span className="text-primary">📋</span> Study Tasks
              </h2>
              <p className="text-base-content/60 mt-1">
                {completedCount} of {tasks.length} tasks completed
              </p>
            </div>
            <div className="radial-progress text-primary font-bold text-sm" style={{ "--value": progress, "--size": "3rem" }} role="progressbar">
              {progress}%
            </div>
          </div>

          <form onSubmit={addTask} className="flex gap-2 mb-8">
            <input 
              type="text" 
              placeholder="What needs to be done?" 
              className="input input-bordered input-primary flex-grow focus:ring-4 focus:ring-primary/20 transition-all text-lg"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit" className="btn btn-primary rounded-xl shadow-lg hover:-translate-y-1 transition-transform px-6">
              Add
            </button>
          </form>

          <div className="space-y-3">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                  task.completed 
                    ? 'bg-base-200/50 border-base-300 opacity-60' 
                    : 'bg-base-100 border-base-300 shadow-sm hover:border-primary/50 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4 flex-grow cursor-pointer" onClick={() => toggleTask(task.id)}>
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTask(task.id)}
                    className="checkbox checkbox-primary checkbox-md" 
                  />
                  <span className={`text-lg font-medium transition-all ${task.completed ? 'line-through text-base-content/50' : 'text-base-content'}`}>
                    {task.text}
                  </span>
                </div>
                <button 
                  className="btn btn-ghost btn-sm btn-circle text-error hover:bg-error/10" 
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}

            {tasks.length === 0 && (
              <div className="text-center py-10 text-base-content/50 bg-base-200/30 rounded-xl border border-dashed border-base-300">
                <div className="text-4xl mb-2">🌱</div>
                <p>No tasks yet. Add one above to get started!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;