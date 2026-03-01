"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "../firebase_config";
import { useRouter, usePathname } from "next/navigation";

export default function DropdownMenu() {
  const items = [
    { label: "Feed", href: "/feed" },
    { label: "Library", href: "/library" },
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
    { label: "Sign Out", action: "logout" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

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
      const auth = getFirebaseAuth();
      await signOut(auth);
      router.push("/"); // Redirect to login
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  const normalItems = items.filter((i) => i.action !== "logout");
  const logoutItem = items.find((i) => i.action === "logout");

  return (
    <div className="sticky top-0 z-50 flex justify-start bg-black">
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex flex-col justify-between w-8 h-8 p-1 m-4 z-50 relative"
      >
        <span className="block h-1 bg-white" />
        <span className="block h-1 bg-white" />
        <span className="block h-1 bg-white" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Full-height dropdown */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Scrollable menu items */}
        <ul className="flex-1 overflow-y-auto py-4 flex flex-col gap-2">
          {normalItems.map((item, idx) => {
            const isActive = item.href && pathname === item.href; // check active
            return (
              <li key={idx}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-3 ${
                    isActive
                      ? "bg-blue-600 text-white font-bold "
                      : "text-black  hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Sign Out button at bottom */}
        {logoutItem && (
          <div className="mt-auto border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="cursor-pointer w-full text-left px-6 py-3 text-black hover:bg-red-500 hover:text-white"
            >
              {logoutItem.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
