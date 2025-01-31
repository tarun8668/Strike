"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "../../lib/firebase"; // Import updateProfile function

type Props = {
  onLogin: (user: { name: string; email: string }) => void;
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [name, setName] = useState<string>("");  // Name (for sign up only)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);  // Toggle between login and signup
  const [error, setError] = useState<string>("");

  // Handle authentication (login or signup)
  const handleAuth = async () => {
    if (email && password) {
      try {
        let userCredential;

        if (isSignUp) {
          // Sign up the user
          if (name) {
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Use updateProfile to update the user's name after successful sign-up
            await updateProfile(userCredential.user, {
              displayName: name,
            });
            onLogin({ name, email }); // Pass user details to onLogin
          } else {
            setError("Please provide your name for sign up.");
            return;
          }
        } else {
          // Log in the user
          userCredential = await signInWithEmailAndPassword(auth, email, password);
          onLogin({ name: userCredential.user.displayName || "", email: userCredential.user.email || email });
        }

        setError(""); // Clear previous errors on successful login/signup
      } catch (error: any) {
        console.error("Authentication error:", error.message);

        // Handle Firebase authentication errors
        if (error.code === "auth/email-already-in-use") {
          setError("The email is already in use. Please log in.");
        } else if (error.code === "auth/user-not-found") {
          setError("No user found with this email. Please sign up.");
        } else if (error.code === "auth/wrong-password") {
          setError("Incorrect password. Please try again.");
        } else if (error.code === "auth/weak-password") {
          setError("The password is too weak. Please choose a stronger password.");
        } else if (error.code === "auth/invalid-email") {
          setError("Please enter a valid email address.");
        } else {
          setError("An error occurred. Please try again.");
        }
      }
    } else {
      setError("Please fill out all fields.");
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
          {isSignUp ? "Sign Up" : "Log In"}
        </motion.h1>

        <div className="space-y-6">
          {/* Name Input (only for Sign Up) */}
          {isSignUp && (
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
          )}

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

          {/* Password Input */}
          <motion.input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />

          {/* Error Message */}
          {error && (
            <motion.div
              className="text-red-500 text-center text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button (Log In or Sign Up) */}
          <motion.button
            onClick={handleAuth}
            className="w-full py-3 bg-white text-black rounded-md font-semibold text-lg hover:bg-gray-300 transition duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </motion.button>

          {/* Toggle between Login and SignUp */}
          <motion.div
            className="text-center text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <span>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button
                className="text-blue-400 hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </button>
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
