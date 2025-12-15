import React, { useState } from 'react';
import './ToDoList.css';

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete Physics Chapter 1", completed: false },
    { id: 2, text: "Revise Calculus formulas", completed: true }
  ]);
  const [newTask, setNewTask] = useState("");

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

  return (
    <div className="todo-container">
      <h2>Study Tasks</h2>
      
      <form className="todo-input-group" onSubmit={addTask}>
        <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="todo-add-btn">Add</button>
      </form>

      <ul className="todo-list">
        {tasks.map(task => (
          <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <span className="todo-text" onClick={() => toggleTask(task.id)}>
              {task.text}
            </span>
            <button className="todo-delete-btn" onClick={() => deleteTask(task.id)}>
              🗑️
            </button>
          </li>
        ))}
        {tasks.length === 0 && <p style={{textAlign: 'center', color: '#888'}}>No tasks yet. Add one above!</p>}
      </ul>
    </div>
  );
};

export default ToDoList;