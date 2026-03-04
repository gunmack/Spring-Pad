"use client";
import { useAuth } from "../../context/AuthContext";
export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <main className="flex w-full flex-col items-center justify-center py-32 px-16">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-extrabold sm:text-6xl text-center">
            <span className="text-blue-300">Profile</span>
          </h1>
          {user && (
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Logged in as: {user.displayName || user.email || "Guest"}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
