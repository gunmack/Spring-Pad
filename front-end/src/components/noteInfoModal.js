import React, { useEffect, useRef, useState } from "react";
import ConfirmDeleteModal from "./confirmDeleteModal";
import { EditorJSViewer } from "./noteViewer";

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
        <div className="fixed inset-0 backdrop-blur-lg z-50 flex items-center justify-center">
          <div
            ref={menuRef}
            className="bg-white text-black rounded-lg shadow-inner w-[90vw] md:w-[60vw] max-h-[80vh] flex flex-col overflow-hidden"
          >
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-4">
              <EditorJSViewer block={note} readOnly />
            </div>

            {/* Actions */}
            {/* <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
              <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg">
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg"
                onClick={() => setConfirmDelete(true)}
              >
                Delete
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
