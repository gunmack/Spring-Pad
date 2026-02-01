"use client";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center sm:items-start space-y-8">
          <h1 className="text-5xl font-extrabold text-black dark:text-white sm:text-6xl">
            Welcome to <span className="text-blue-600">SpringPad Revived</span>
          </h1>

          <div className="flex space-x-4 mt-6">
            {/* <a
              href="/signup"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </a> */}
            <a
              href="/auth"
              className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-50 dark:hover:bg-gray-900 transition-colors"
            >
              Login
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
