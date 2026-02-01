"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase_config";
import { useRouter } from "next/navigation";

export default function DropdownMenu() {
  const items = [
    { label: "Feed", href: "/feed" },
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
    { label: "Sign Out", action: "logout" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error); // Log any errors
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <div className="relative flex justify-start" ref={menuRef}>
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-between w-8 h-8 p-1 mb-8"
      >
        <span className="block h-1 bg-white" />
        <span className="block h-1 bg-white" />
        <span className="block h-1 bg-white" />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="py-1">
          {items.map((item, idx) => (
            <li key={idx}>
              {item.action === "logout" ? (
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
