"use client";
import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import EditorjsList from "@editorjs/list";
import { useAuth } from "../../context/AuthContext";
import { loadNotes } from "./loadNotes";
import { NoteCards } from "./notes-struct";
import Paragraph from "@editorjs/paragraph";

export default function NotesFeed() {
  const [notes, setNotes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
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
        <div className="mt-8 w-2/3  ">
          <NoteCards notes={notes} />
        </div>

        {openModal && (
          <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm z-50">
            <div className="flex flex-col w-[90vw] max-w-3xl bg-white rounded-lg shadow-lg overflow-auto p-6">
              <h1 className="text-black font-bold text-xl text-center mb-4">
                Add Note
              </h1>
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
