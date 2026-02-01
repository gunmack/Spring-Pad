/**
 * Login page component
 */

"use client";
import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase_config";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [popup, setPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName != null) {
        router.push("/feed"); // replace avoids back-button issues
      } else {
        setCheckingAuth(false); // user not signed in → show form
      }
    });

    return () => unsubscribe();
  }, [router]);
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  const handleGoogleSignIn = async () => {
    setPopup(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const uid = result.user.uid;
      router.push("/feed"); // Redirect to a protected page
    } catch (err) {
      console.error("Error signing in with Google:", err.message);
      setMsg("Error signing in with Google, please try again.");
    }
    setPopup(false);
  };

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      alert("Please enter your email and password.");
    } else {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        router.push("/main-menu"); // Redirect to a protected page
      } catch (error) {
        // console.error('Error signing in:', error.message);
        setMsg(`An error occured, please try again.`);
        if (error.code === "auth/invalid-credential") {
          setMsg("Incorrect email or password. Please try again.");
        } else {
          setMsg(`An error occured, please try again.`);
        }
      }
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      router.push("/feed"); // Redirect after signing in as guest
    } catch (error) {
      console.error("Error during guest login:", error.message);
    }
  };

  return (
    <div
      className="relative min-h-screen flex justify-center items-center p-8 sm:p-20 bg-gradient-to-r"
      data-testid="Login screen"
    >
      <div className="bg-white w-full max-w-3xl shadow-md rounded-lg p-8">
        {/* <strong className="text-center text-black block mb-6 text-2xl">
          Sign In
        </strong> */}
        <p className="text-center block mb-2 text-l">
          {/* Signing in allows you to unlock the full potential of QuizLing. By
          signing in, you can track your linguistic progress over time, set
          personalized goals, and enjoy full access to our achievements feature. */}
        </p>

        <div className="text-center">
          {msg && <h2 className="mb-4 text-red-500">{msg}</h2>}
          <br />
          {!popup && (
            <div>
              <div className="flex flex-col gap-4 bg-gray-100 p-8 rounded-lg">
                {/* <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-600 text-sm mb-2"
                  ></label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="md:w-1/2 w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#5999AE]"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-600 text-sm mb-2"
                  ></label>
                  <input
                    type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="md:w-1/2 w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#5999AE]"
                    placeholder="Enter your password"
                    required
                  />
                </div> */}
                <div className="flex flex-row gap-4 pt-4 justify-center items-center">
                  {/* <button
                    onClick={() => handleLogin(email, password)}
                    className="bg-black p-1 md:w-5/12 w-full rounded-lg hover:bg-gray-700 text-white"
                  >
                    Login
                  </button> */}

                  <button
                    className="bg-black p-2.5 rounded-lg hover:bg-gray-700 text-white flex items-center justify-center"
                    onClick={handleGoogleSignIn}
                  >
                    Login with Google
                  </button>
                </div>
              </div>
              {/* <div className="p-8">
                <p className="text-sm text-gray-500 mt-4">
                  Don’t have an account?
                  <button
                    className=" p-2  text-blue-600 hover:underline "
                    onClick={handleGuestLogin}
                  >
                    Continue as Guest
                  </button>
                  or{" "}
                  <Link
                    href="/sign-up"
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Forgot your password?{" "}
                  <Link href="/reset" className="text-blue-600 hover:underline">
                    Reset password
                  </Link>
                </p>
              </div> */}
            </div>
          )}

          {popup && (
            <p className="text-black">
              A Google popup has opened to help you log in...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
