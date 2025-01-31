// app/layout.tsx
"use client"; // This is a client-side component

import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/Home"; // Main task page
import "../styles/globals.css"; // Ensure this import is correct

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Check if user data exists in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user from localStorage if available
    }
  }, []); // Empty dependency array ensures this effect runs only on mount

  const handleLogin = (user: { name: string; email: string }) => {
    setUser(user); // Set user state after login
    localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
  };

  const handleLogout = () => {
    setUser(null); // Reset user state on logout
    localStorage.removeItem("user"); // Remove user data from localStorage
  };

  return (
    <html lang="en">
      <body className="bg-black text-white">
        {!user ? (
          <Login onLogin={handleLogin} /> // Show login page if no user
        ) : (
          <Home user={user} onLogout={handleLogout} /> // Show home page if user is logged in
        )}
        <footer className="w-full text-center py-4 text-gray-400 mt-6">
          <p>Copyright © 2025 Tarun</p>
        </footer>
      </body>
    </html>
  );
}
