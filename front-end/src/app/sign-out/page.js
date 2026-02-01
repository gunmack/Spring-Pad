"use client"; // must be at top

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase_client";

export default function SignOutPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth");
    } catch (err) {
      console.error(err);
      alert("Error signing out. Please try again.");
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
