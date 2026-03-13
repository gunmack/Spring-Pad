import React from "react";

export default function ConfirmDeleteModal({ id, onCancel, onDelete }) {
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center z-50 justify-center">
      <div className="bg-white rounded-lg p-6 w-80 flex flex-col items-center">
        <p className="mb-4 text-center">Are you sure you want to delete this?</p>
        <div className="flex flex-row justify-between gap-4">
          <button
            className="px-4 py-2 cursor-pointer bg-red-400 hover:bg-red-500 text-white rounded-lg"
            onClick={async () => {
              await onDelete(id);
              onCancel();
            }}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 cursor-pointer bg-gray-400 hover:bg-gray-500 text-gray-800 rounded-lg"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
