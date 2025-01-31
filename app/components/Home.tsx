"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trash, PlusCircle } from "lucide-react";

type HomeProps = {
  user: { name: string; email: string };
  onLogout: () => void;
};

type Task = {
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
};

const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  // Load tasks from localStorage, or default to an empty array if not available
  const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  const [tasks, setTasks] = useState<Task[]>(loadTasksFromLocalStorage());
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false, priority }]);
      setInput("");
    }
  };

  const toggleTask = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const taskPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-mono w-full relative">
      {/* Small Circular Logout Button with SVG */}
      <button
        onClick={onLogout}
        className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-all"
      >
        {/* SVG Icon for Logout */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"> 
          <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> 
        </svg>
      </button>

      <h1 className="text-5xl font-bold mb-6 text-center tracking-wider">
        Strike
      </h1>

      {/* Task Manager Section */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 w-full max-w-3xl px-4">
        <input
          className="bg-gray-800 text-white border border-gray-600 w-full md:flex-1 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
          className="bg-gray-800 text-white border border-gray-600 p-3 rounded-md"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={addTask}
          className="bg-gray-700 text-white flex items-center justify-center gap-2 p-3 rounded-md w-full md:w-auto transition-all hover:bg-gray-600"
        >
          <PlusCircle size={20} />
          Add Task
        </button>
      </div>

      <div className="w-full max-w-3xl px-4">
        <AnimatePresence>
          {tasks
            .sort((a, b) => {
              const priorityOrder = { low: 1, medium: 2, high: 3 };
              return priorityOrder[b.priority] - priorityOrder[a.priority]; // Sort tasks by priority (high to low)
            })
            .map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="w-full mb-4"
              >
                {/* Task Card */}
                <motion.div
                  className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-900 border border-gray-700 w-full rounded-md shadow-lg"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.span
                    className={`text-lg text-center md:text-left ${
                      task.completed ? "line-through text-gray-500" : "text-white"
                    }`}
                    animate={{ opacity: task.completed ? 0.5 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {task.text}
                    {/* Priority Badge */}
                    <span
                      className={`ml-3 px-2 py-1 text-sm font-semibold text-white rounded-full ${taskPriorityColor(task.priority)}`}
                    >
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </motion.span>
                  <div className="flex gap-2 mt-3 md:mt-0">
                    <button
                      onClick={() => toggleTask(index)}
                      className="bg-white text-black p-3 rounded-md transition-all hover:bg-gray-200"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={() => removeTask(index)}
                      className="bg-gray-500 text-white p-3 rounded-md transition-all hover:bg-gray-400"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
