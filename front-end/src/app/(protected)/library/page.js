"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AddModal from "@/components/addModal";
export default function Library() {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const handleAdd = async (data) => {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Status:", response.status);
      console.log("OK:", response.ok);

      const text = await response.text();
      console.log("Response body:", text);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setOpenModal(false);
  };
  return (
    <div>
      <button
        className="fixed top-4 right-4 w-12 h-12 bg-blue-600 hover:bg-blue-700text-white rounded-full flex items-center justify-center text-3xl shadow-lg z-50 cursor-pointer"
        onClick={() => setOpenModal(true)}
        title="Create new entry"
      >
        +
      </button>

      <AddModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAdd}
      />

      <main className="flex  w-full flex-col items-center justify-center py-32 px-16 ">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-extrabold  sm:text-6xl text-center">
            <span className="text-blue-300">Library/New</span>
          </h1>
          {user && (
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Logged in as: {user.displayName || user.email}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
