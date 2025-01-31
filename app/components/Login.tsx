// app/components/Login.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  onLogin: (user: { name: string; email: string }) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleLogin = () => {
    if (name && email) {
      onLogin({ name, email });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
      <motion.div
        className="bg-black bg-opacity-80 p-8 rounded-lg w-full max-w-md shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Sign Up
        </motion.h1>
        
        <div className="space-y-6">
          {/* Name Input */}
          <motion.input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
          
          {/* Email Input */}
          <motion.input
            type="email"
            placeholder="Email"
            className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          />
          
          {/* Login Button */}
          <motion.button
            onClick={handleLogin}
            className="w-full py-3 bg-white text-black rounded-md font-semibold text-lg hover:bg-gray-300 transition duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Sign up
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
