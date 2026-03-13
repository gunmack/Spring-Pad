"use client";
import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import EditorjsList from "@editorjs/list";
import { useAuth } from "../../context/AuthContext";
import { loadNotes } from "./loadNotes";
import Paragraph from "@editorjs/paragraph";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const holderRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await loadNotes(user.email);
      setNotes(notesData);
    };
    fetchNotes();
  }, [user.email]);

  useEffect(() => {
    if (openModal && holderRef.current && !editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: holderRef.current,
        autofocus: true,
        tools: {
          title: {
            class: require("title-editorjs"),
            inlineToolbar: true,
          },
          header: {
            class: require("@editorjs/header"),
            inlineToolbar: true,
          },
          Paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          list: {
            class: EditorjsList,
            inlineToolbar: true,
          },
        },
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
        className="fixed top-4 right-4 w-12 h-12 bg-blue-600 hover:bg-blue-700text-white rounded-full flex items-center justify-center text-3xl shadow-lg z-50 cursor-pointer"
        onClick={() => setOpenModal(true)}
        title="Add new note"
      >
        +
      </button>

      <main className="flex  flex-col items-center justify-center ">
        <h1 className="text-5xl font-extrabold  sm:text-6xl text-center">
          <span className="text-blue-300">Notes</span>
        </h1>
        <div className="mt-8 px-4 w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {notes.map((note) => (
              <div
                key={note.n_id}
                className="bg-white text-black p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <p className="wrap-break-word">{note.n_title}</p>
                {/* <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  {new Date(note.created_at).toLocaleString()}
                </p> */}
              </div>
            ))}
          </div>
        </div>

        {openModal && (
          <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-50">
            <div className="flex flex-col w-[90vw] max-w-3xl bg-white rounded-lg shadow-lg overflow-auto p-6">
              <div className="bg-gray-50 text-black p-4 rounded-md border border-gray-200 shadow-inner min-h-75">
                <div ref={holderRef}></div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-red-400 hover:bg-red-500 rounded-lg shadow-md cursor-pointer"
                  onClick={() => setOpenModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
