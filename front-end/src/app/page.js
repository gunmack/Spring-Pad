"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center px-8 py-16 bg-black text-center sm:text-left rounded-lg shadow-lg">
        <h1 className="text-2xl font-extrabold text-white sm:text-4xl  ">
          Welcome to <br />
          <span className="text-blue-600">SpringPad Revived</span>
        </h1>
        <div className="flex space-x-4 mt-8  ">
          <Link
            href="/auth"
            className="px-4 py-2 sm:px-6 sm:py-3 border border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-gray-900  "
          >
            Login
          </Link>
        </div>
      </main>
    </div>
  );
}
