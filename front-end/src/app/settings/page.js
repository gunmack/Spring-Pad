"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // adjust path
import DropdownMenu from "@/components/dropdown";
export default function Settings() {
  const router = useRouter();
  const { user, loading } = useAuth(); // use context instead of local state
  useEffect(() => {
    if (!loading && !user) router.push("/auth");
  }, [loading, user, router]);
  return (
    <div>
      <DropdownMenu />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-extrabold text-black dark:text-white sm:text-6xl text-center">
              <span className="text-blue-600">Settings</span>
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
}
