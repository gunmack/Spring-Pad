"use client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex w-full max-w-3xl flex-col items-center justify-center px-8 py-16 shadow-lg">
        <h1 className="text-2xl font-extrabold  sm:text-4xl  ">
          Welcome to <br />
          <span className="text-blue-300">SpringPad Revived</span>
        </h1>
        <div className="flex space-x-4 mt-8  ">
          <Link
            href="/auth"
            className="px-4 py-2 sm:px-6 sm:py-3 border border-blue-300 text-blue-300 font-semibold rounded-md hover:bg-blue-800 hover:text-white  "
          >
            Login
          </Link>
        </div>
      </main>
    </>
  );
}
