"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // adjust path
import DropdownMenu from "@/components/dropdown";

export default function Feed() {
  const router = useRouter();
  const { user } = useAuth(); // use context instead of local state

  // redirect to auth page if not logged in
  useEffect(() => {
    if (!user) router.push("/auth");
  }, [user, router]);

  return (
    <div>
      <DropdownMenu />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-5xl font-extrabold text-black dark:text-white sm:text-6xl">
              Welcome to <span className="text-blue-600">Feed page</span>
            </h1>
            {user && (
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Logged in as: {user.displayName || user.email || "Guest"}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
