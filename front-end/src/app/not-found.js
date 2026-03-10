"use client";
import Link from "next/link";
import { useAuth } from "../app/context/AuthContext";

export default function NotFound() {
  const { user } = useAuth();

  return (
    <main className="flex min-w-screen flex-col gap-8 items-center justify-center min-h-screen ">
      <h1>
        <span className="text-blue-300 text-5xl font-extrabold  sm:text-6xl text-center">
          Page Not Found
        </span>
      </h1>
      {user && (
        <div className="text-xl">
          <Link href="/calendar" className="text-blue-500 hover:underline">
            Go back home
          </Link>
        </div>
      )}

      {!user && (
        <div className="text-xl">
          <Link href="/" className="text-blue-500 hover:underline">
            Return to landing page
          </Link>
        </div>
      )}
    </main>
  );
}
