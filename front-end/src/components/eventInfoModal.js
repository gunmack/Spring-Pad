import React, { useEffect, useRef, useState } from "react";
import ConfirmDeleteModal from "./confirmDeleteModal";

export default function EventInfo({ event, onClose, onDelete }) {
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
    <>
      {confirmDelete && (
        <ConfirmDeleteModal
          id={event.id}
          onCancel={() => setConfirmDelete(false)}
          onDelete={async (id) => {
            await onDelete(id);
            setConfirmDelete(false);
            onClose();
          }}
        />
      )}
      {!confirmDelete && event && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center">
          <div
            ref={menuRef}
            className="bg-white rounded-lg p-2  overflow-auto relative flex flex-col"
          >
            <div className="p-4 m-4">
              <h2 className="text-xl font-bold mb-2">{`${event.title}`}</h2>
              {event.description && <p className="mb-2">{event.description}</p>}
              <p>Start: {new Date(event.start).toLocaleString()}</p>
              <p>End: {new Date(event.end).toLocaleString()}</p>
            </div>
            <div className="flex flex-row justify-between p-4 m-4 ">
              <button className="px-4 py-2 cursor-pointer bg-blue-400 hover:bg-blue-500 text-white rounded-lg">
                Edit
              </button>
              <button
                className="px-4 py-2 cursor-pointer bg-red-400 hover:bg-red-500 text-white rounded-lg"
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
