"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "../firebase_config";
import { useRouter, usePathname } from "next/navigation";

function MenuItem({ item, pathname, setIsOpen }) {
  const isActive = item.href && pathname === item.href;

  return (
    <li>
      <a
        href={item.href}
        onClick={() => setIsOpen(false)}
        className={`block px-6 py-3 rounded-lg transition-all ${
          isActive
            ? "bg-blue-500 text-white font-semibold border-l-4 border-blue-700"
            : "text-black hover:bg-gray-200"
        }`}
      >
        {item.label}
      </a>
    </li>
  );
}

function MenuGroup({ title, items, pathname, setIsOpen }) {
  return (
    <div>
      <div className="px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
        {title}
      </div>

      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <MenuItem
            key={item.label}
            item={item}
            pathname={pathname}
            setIsOpen={setIsOpen}
          />
        ))}
      </ul>
    </div>
  );
}

export default function DropdownMenu() {
  const items = [
    { label: "Calendar", href: "/calendar" },
    { label: "Notes", href: "/notes" },
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
      setTimeout(() => {
        router.push("/goodbye!");
      }, 1); // Redirect to login
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  const mainItems = (items ?? []).filter((i) =>
    ["/calendar", "/notes"].includes(i.href),
  );

  const profileNsettings = (items ?? []).filter((i) =>
    ["/profile", "/settings"].includes(i.href),
  );

  const logoutItem = (items ?? []).find((i) => i.action === "logout");

  return (
    <div className="sticky top-0 z-50 flex justify-start ">
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex flex-col justify-between w-8 h-8 p-1 m-4 z-50 relative hover:bg-gray-500 rounded-sm"
      >
        <span className="block h-1 bg-white" />
        <span className="block h-1 bg-white" />
        <span className="block h-1 bg-white" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/20 backdrop-blur-md z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Full-height dropdown */}

      <div
        ref={menuRef}
        className={`bg-gray-300 fixed top-0 left-0 h-full w-64 shadow-lg z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex p-4 bg-black text-white text-xl font-bold items-center justify-center">
          Spring-Pad
        </div>

        {/* Scrollable section */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          <MenuGroup
            title="Main"
            items={mainItems}
            pathname={pathname}
            setIsOpen={setIsOpen}
          />

          <MenuGroup
            title="Account"
            items={profileNsettings}
            pathname={pathname}
            setIsOpen={setIsOpen}
          />
        </div>

        {/* Logout */}
        {logoutItem && (
          <div className="p-4  border-gray-400">
            <button
              onClick={handleSignOut}
              className="cursor-pointer w-full text-left px-6 py-3 rounded-lg text-black hover:bg-red-500 hover:text-white transition"
            >
              {logoutItem.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
