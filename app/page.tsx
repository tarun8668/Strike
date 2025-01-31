// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Home from "./components/Home"; // Main task page
import Login from "./components/Login"; // Login component

export default function Page() {
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

  if (!user) {
    return <Login onLogin={handleLogin} />; // Show login page if no user
  }

  return <Home user={user} onLogout={handleLogout} />; // Show home page if user is logged in
}
