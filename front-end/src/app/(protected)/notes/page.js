"use client";
import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
// import EditorjsList from "@editorjs/list";
import { useAuth } from "../../context/AuthContext";
import { loadNotes } from "./loadNotes";
import { NoteCards } from "./notes-struct";
import Paragraph from "@editorjs/paragraph";
import { addNote } from "./addNote";
// import Header from "@editorjs/header";
import Title from "title-editorjs";
import TextStyleTool from "@skchawala/editorjs-text-style";
import { editorTools } from "@/utils/EditorJSTools";

export default function NotesFeed() {
  const [notes, setNotes] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  const holderRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    if (!user?.email) return;
    const fetchNotes = async () => {
      const notesData = await loadNotes(user.email);
      setNotes(notesData);
    };
    fetchNotes();
  }, [user?.email]);

  useEffect(() => {
    if (openModal && holderRef.current && !editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: holderRef.current,
        autofocus: true,
        tools: editorTools,
      });
    }

    // Optional cleanup when modal closes
    if (!openModal && editorInstance.current) {
      editorInstance.current.destroy();
      editorInstance.current = null;
    }
  }, [openModal]);

  return (
    <div>
      <button
        className="fixed top-4 right-4 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center text-3xl shadow-lg z-50 cursor-pointer"
        onClick={() => setOpenModal(true)}
        title="Add new note"
      >
        +
      </button>

      <main className="flex flex-col items-center justify-center ">
        <div className="mt-8 w-2/3">
          {notes && Object.keys(notes).length === 0 ? (
            <p className="font-bold mt-8 text-xl text-white text-center">
              No notes available.
            </p>
          ) : (
            <NoteCards groupedNotes={notes} />
          )}
        </div>

        {openModal && (
          <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-50">
            <div className="bg-white w-full max-w-2xl md:max-w-4xl p-4 rounded-lg shadow-lg">
              <div className="flex flex-col max-w-xl md:max-w-3xl  mx-8 py-6 overflow-auto">
                <h1 className="text-black font-bold text-xl text-center mb-4">
                  Add Note
                </h1>
                <div className=" bg-gray-50 text-black rounded-md border border-gray-200 shadow-inner max-h-[60vh] overflow-auto">
                  <div ref={holderRef}></div>
                </div>
                <div className="flex justify-between md:justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-green-400 hover:bg-green-500 rounded-lg shadow-md cursor-pointer mr-2"
                    onClick={async () => {
                      if (!editorInstance.current) return;

                      try {
                        // Save the content from EditorJS
                        const outputData = await editorInstance.current.save();

                        // Send it to backend
                        const saved = await addNote(user.email, outputData); // actual EditorJS content
                        console.log(
                          "Note saved:",
                          saved,
                          "Output data:",
                          outputData,
                        );

                        // Update the grouped notes state
                        setNotes((prevNotes) => {
                          const type = saved.n_type || "DEFAULT";
                          const updated = { ...prevNotes };

                          // If the type doesn't exist yet, create an array
                          if (!updated[type]) updated[type] = [];

                          updated[type] = [...updated[type], saved]; // append the new note
                          return updated;
                        });

                        setOpenModal(false);
                      } catch (err) {
                        console.error("Error saving note:", err);
                      }
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-red-400 hover:bg-red-500 rounded-lg shadow-md cursor-pointer"
                    onClick={() => setOpenModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
