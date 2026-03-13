"use client";
import React, { useState } from "react";
import NoteInfo from "@/components/noteInfoModal";

export const NoteCards = ({ notes }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  return (
    <div className="px-4 py-6">
      {/* Modal rendered once */}
      {selectedNote && (
        <NoteInfo note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.map((note) => (
          <div
            key={note.n_id}
            className="bg-white text-black rounded-xl shadow-md hover:shadow-xl 
                       transform transition duration-200 hover:scale-105 
                       p-6 flex items-center justify-center cursor-pointer"
            onClick={() => setSelectedNote(note)}
          >
            <h2 className="text-lg font-semibold text-center">
              {note.n_title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};
