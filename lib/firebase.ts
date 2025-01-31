// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyAR5BXVjMeXt9uNCD7lhSYq_bteQLd_sM0",
    authDomain: "strike-todo.firebaseapp.com",
    projectId: "strike-todo",
    storageBucket: "strike-todo.firebasestorage.app",
    messagingSenderId: "214703748926",
    appId: "1:214703748926:web:6553dbff5398c129279e6f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Authentication instance
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile };