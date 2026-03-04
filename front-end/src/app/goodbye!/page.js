"use client";

import Link from "next/link";

export default function SignOutPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 bg-white dark:bg-black px-16 py-12 rounded-lg shadow-lg text-center max-w-md w-full">
      <p className="text-lg font-medium">You have been signed out. Goodbye!</p>
      <Link
        href="/"
        className="px-6 py-3 border border-blue-300 text-blue-300 font-semibold rounded-md hover:bg-blue-50 dark:hover:bg-gray-900 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
