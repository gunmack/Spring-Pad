"use client";
import React, { useState } from "react";
import NoteInfo from "@/components/noteInfoModal";
import Masonry from "react-masonry-css";
import "./notes.css";

export const NoteCards = ({ notes }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  const breakpointColumnsObj = {
    default: 3,
    1280: 2,
    800: 1,
  };

  return (
    <div>
      {/* Modal rendered once */}
      {selectedNote && (
        <NoteInfo note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid "
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div
            key={note.n_id}
            className="rounded-lg cursor-pointer"
            onClick={() => setSelectedNote(note)}
          >
            <h3 className="text-lg font-semibold mb-2">{note.n_title}</h3>
            <p className="text-sm text-gray-600 font-medium ">
              {note.n_data.length > 100
                ? note.n_data.substring(0, 100) + "..."
                : note.n_data}
            </p>
          </div>
        ))}
      </Masonry>
    </div>
  );
};
