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
        router.push("/calendar");
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
    // setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setLoading(true); // Show loading while redirecting
      router.push("/calendar");
      setPopupOpen(false);
      setLoading(true);
    } catch (err) {
      console.error("Google sign-in error:", err);
      setMsg("Please try again.");
    } finally {
      setPopupOpen(false);
      setLoading(false);
    }
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
      <div className="flex items-center h-1/2 w-1/2 gap-2 ">
        <div className=" border-2 border-white  border-t-transparent rounded-full animate-spin"></div>
        <div>Checking authentication...</div>
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
      <div>
        <button
          onClick={handleGoogleSignIn}
          disabled={popupOpen}
          className={`w-full p-4 rounded-lg mb-4 flex justify-center items-center 
          ${
            popupOpen
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 cursor-pointer"
          }
          `}
        >
          {popupOpen && (
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <div>Authenticating...</div>
            </div>
          )}
          {!popupOpen && <div>Authenticate with Google</div>}
        </button>
      </div>

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
