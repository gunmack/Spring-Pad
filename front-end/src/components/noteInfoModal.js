import React, { useEffect, useRef, useState } from "react";
import ConfirmDeleteModal from "./confirmDeleteModal";
import "./styles/components.css";

export default function NoteInfo({ note, onClose, onDelete }) {
  const menuRef = useRef(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);
  return (
    <div>
      {/* {confirmDelete && (
        <ConfirmDeleteModal
          id={note.id}
          onCancel={() => setConfirmDelete(false)}
          onDelete={async (id) => {
            await onDelete(id);
            setConfirmDelete(false);
            onClose();
          }}
        />
      )} */}
      {note && (
        <div className=" fixed inset-0  backdrop-blur-lg z-50 flex items-center justify-center">
          <div
            ref={menuRef}
            className="border border-gray-200 shadow-inner bg-white text-black rounded-lg p-2 max-w-2xl max-h-[80vh] overflow-auto relative flex flex-col"
          >
            <div className="p-4 m-4 ">
              <h2 className="notes-info-header">{`${note.n_title}`}</h2>
              <p className="notes-info-content">{note.n_data}</p>
            </div>
            <div className="flex flex-row justify-between p-4 m-4 ">
              {/* <button className="px-4 py-2 cursor-pointer bg-blue-400 hover:bg-blue-500 text-white rounded-lg">
                Edit
              </button> */}
              {/* <button
                className="px-4 py-2 cursor-pointer bg-red-400 hover:bg-red-500 text-white rounded-lg"
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                Delete
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
