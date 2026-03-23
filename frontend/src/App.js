import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import Dashboard from './pages/Dashboard';
import Timer from './components/Timer';

import { getTasks, addTask as addTaskAPI, deleteTask, completeTask } from "./services/Api";

function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then((res) => {
      setTasks(res.data);
    });
  }, []);

  const addTask = async (task) => {
    const res = await addTaskAPI(task);
    setTasks([...tasks, res.data]);
  };

  const deleteTaskHandler = async (id) => {
    await deleteTask(id);
    const updated = tasks.filter((t) => t._id !== id);
    setTasks(updated);
  };

  const completeTaskHandler = async (id) => {
    await completeTask(id);
    const updated = tasks.map((t) =>
      t._id === id ? { ...t, completed: true } : t
    );
    setTasks(updated);
  };

  return (
    <div>
      <Navbar />
      <Dashboard tasks={tasks} />
      <Timer />
      <TaskForm addTask={addTask} />

      <div className="container mt-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            deleteTask={() => deleteTaskHandler(task._id)}
            completeTask={() => completeTaskHandler(task._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;