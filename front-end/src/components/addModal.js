"use client";
import { useState } from "react";

export default function AddModal({ open, onClose, onSubmit }) {
  const [autoCategorize, setAutoCategorize] = useState(false);
  const [visibility, setVisibility] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black">New Entry</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            onSubmit({
              title: data.title,
              description: data.description,
              date: data.date,
              autoCategorize,
              visibility,
            });
            setAutoCategorize(false);
            setVisibility(false);
          }}
        >
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border text-black rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 border min-h-25 text-black rounded-lg"
              required
            ></textarea>
          </div>
          <div>
            <input
              type="date"
              id="date"
              name="date"
              className="ml-2 px-3 py-2 border text-black rounded-lg"
              required
            />
          </div>
          <div className="mt-4 justify-between flex">
            <div>
              <input
                type="checkbox"
                id="autoCategorize"
                checked={autoCategorize}
                onChange={(e) => setAutoCategorize(e.target.checked)}
                className="ml-2 px-3 py-2 border text-black rounded-lg"
              />
              <label htmlFor="autoCategorize" className="ml-2 text-black ">
                Auto categorize
              </label>
              {/* <p>Value: {autoCategorize}</p> */}
            </div>
            <div>
              <input
                type="checkbox"
                id="visibility"
                checked={visibility}
                onChange={(e) => setVisibility(e.target.checked)}
                className="ml-2 px-3 py-2 border text-black rounded-lg"
              />
              <label htmlFor="visibilityPrivate" className="ml-2 text-black ">
                Private
              </label>
              {/* <p>Visibility: {visibility}</p> */}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-4 px-4 py-2 bg-red-400 rounded-lg cursor-pointer hover:bg-red-600 text-white"
              onClick={() => {
                onClose();
                setAutoCategorize(false);
                setVisibility(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-400 hover:bg-green-600 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
