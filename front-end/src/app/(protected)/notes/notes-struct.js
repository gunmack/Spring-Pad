"use client";
import React, { useState } from "react";
import NoteInfo from "@/components/noteInfoModal";
import Masonry from "react-masonry-css";
import "./notes.css";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export const NoteCards = ({ groupedNotes }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [openType, setOpenType] = useState({});

  const breakpointColumnsObj = {
    default: 3,
    1280: 2,
    800: 1,
  };

  const toggleType = (type) => {
    setOpenType((prev) => ({
      [type]: !prev[type],
    }));
  };

  return (
    <div>
      {/* Modal rendered once */}
      {selectedNote && (
        <NoteInfo note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}

      {Object.entries(groupedNotes || {}).map(([type, notes]) => (
        <div
          key={type}
          onClick={() => toggleType(type)}
          className="m-8 shadow-md rounded-lg px-8 py-4 bg-white hover:cursor-pointer"
        >
          <div className="my-masonry-header flex justify-between items-center ">
            <span className="font-bold text-sm md:text-lg">{type}</span>
            <span>
              {openType[type] ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </span>
          </div>

          {openType[type] && (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {notes.map((note) => (
                <div
                  key={note.n_id}
                  className="rounded-lg cursor-pointer"
                  onClick={() => setSelectedNote(note)}
                >
                  <h3 className="text-lg font-semibold mb-2">{note.n_title}</h3>
                  <p className="notes-content">{JSON.stringify(note.n_data)}</p>
                </div>
              ))}
            </Masonry>
          )}
        </div>
      ))}
    </div>
  );
};
