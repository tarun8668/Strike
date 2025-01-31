// app/components/Home.tsx
"use client"
import { useState } from "react";
import Login from "./Login";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trash, PlusCircle } from "lucide-react";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);
  const [input, setInput] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
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

  const handleLogin = (user: any) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-mono w-full">
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
          {tasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="flex flex-col md:flex-row justify-between items-center p-4 mb-2 bg-gray-900 border border-gray-700 w-full rounded-md shadow-lg">
                <motion.span
                  className={`text-lg text-center md:text-left ${
                    task.completed ? "line-through text-gray-500" : "text-white"
                  }`}
                  animate={{ opacity: task.completed ? 0.5 : 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {task.text}
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
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
