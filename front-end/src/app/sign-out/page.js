"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase_config";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // or "/"
    } catch (error) {
      console.error("Logout failed:", error);
      alert(`Error signing out: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700"
    >
      Log out
    </button>
  );
}
