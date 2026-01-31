"use client";

import { useState, useRef, useEffect } from "react";

export default function DropdownMenu({
  items = ["Feed", "Profile", "Settings"],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex justify-start" ref={menuRef}>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col justify-between w-8 h-8 p-1 mb-8 focus:outline-none"
      >
        <span
          className={`block h-1 bg-white transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-3" : ""
          }`}
        ></span>
        <span
          className={`block h-1 bg-white transition-all duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block h-1 bg-white transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-3" : ""
          }`}
        ></span>
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-transform duration-200 ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col py-1">
          {items.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href || "#"}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-black hover:bg-gray-100 rounded-md transition-colors"
              >
                {item.label || item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
