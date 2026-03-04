"use client";

import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase_client"; // client-only Firebase
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (!auth) return; // skip SSR

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        router.push("/feed");
      } else {
        setLoading(false);
      }
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    if (!auth) return;

    setPopupOpen(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/feed");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setMsg("Error signing in with Google. Try again.");
    }
    setPopupOpen(false);
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setMsg("Enter both email and password.");
      return;
    }

    if (!auth) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/feed");
    } catch (err) {
      console.error("Email sign-in error:", err);
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setMsg("Incorrect email or password.");
      } else {
        setMsg("Login failed. Try again.");
      }
    }
  };

  const handleGuestLogin = async () => {
    if (!auth) return;

    try {
      await signInAnonymously(auth);
      router.push("/feed");
    } catch (err) {
      console.error("Guest login error:", err);
      setMsg("Failed to log in as guest. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className=" w-full max-w-md shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold text-center mb-6 ">Sign In</h1>

      {msg && <p className="mb-4 text-red-500 text-center">{msg}</p>}

      {/* Email/password login */}
      {/* <div className="flex flex-col gap-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleEmailLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
          >
            Log In
          </button>
        </div> */}

      {/* Google sign-in */}
      <button
        onClick={handleGoogleSignIn}
        className="cursor-pointer w-full bg-green-500 hover:bg-green-600  p-4 rounded-lg mb-4 flex justify-center items-center "
      >
        {popupOpen ? "Opening Google popup..." : "Authenticate with Google"}
      </button>

      {/* Guest login */}
      {/* <button
          onClick={handleGuestLogin}
          className="w-full border border-gray-500 hover:bg-gray-100 p-2 rounded-lg text-black dark:text-white"
        >
          Continue as Guest
        </button> */}
    </div>
  );
}
