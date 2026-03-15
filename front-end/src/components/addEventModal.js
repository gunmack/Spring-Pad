"use client";
import { useState } from "react";
import { useAuth } from "../app/context/AuthContext";

export default function AddEvent({ open, onClose, onSubmit }) {
  const { user } = useAuth();
  const [autoCategorize, setAutoCategorize] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [allDay, setAllDay] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black">New Entry</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            const newEvent = {
              uid: user.uid,
              title: data.title,
              description: data.description || "",
              start: new Date(
                `${data.startDate}T${data.startTime || "00:00:00"}`,
              ).toISOString(),
              end: new Date(
                `${data.endDate}T${data.endTime || "23:59:59"}`,
              ).toISOString(),
              // autoCategorize,
              // visibility,
            };

            try {
              const response = await fetch("/api/events", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newEvent),
              });
              if (!response.ok) {
                throw new Error("Failed to add event");
              }
              const savedEvent = await response.json();
              console.log("Event added successfully:", savedEvent);
              onSubmit(savedEvent);
            } catch (error) {
              console.error("Error adding event:", error);
            }
            setAutoCategorize(false);
            setVisibility(false);
          }}
        >
          <div className="mb-8">
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

          <div className="mb-8">
            <label className="block text-black mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 border min-h-25 text-black rounded-lg"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-black mb-1" htmlFor="startDate">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="w-full px-3 py-2 border rounded-lg text-black"
                required
              />
            </div>

            {/* Start Time */}
            {!allDay && (
              <div>
                <label className="block text-black mb-1" htmlFor="startTime">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="w-full px-3 py-2 border rounded-lg text-black"
                  required
                />
              </div>
            )}

            {/* End Date */}
            <div>
              <label className="block text-black mb-1" htmlFor="endDate">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="w-full px-3 py-2 border rounded-lg text-black"
                required
              />
            </div>

            {/* End Time */}
            {!allDay && (
              <div>
                <label className="block text-black mb-1" htmlFor="endTime">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  className="w-full px-3 py-2 border rounded-lg text-black"
                  required
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              id="allDay"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
            />
            <label htmlFor="allDay" className="text-black">
              All Day
            </label>
          </div>

          {/*<div className="mt-4 justify-between flex">
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
             
            </div>
            <div>
              <input
                type="checkbox"
                id="visibility"
                checked={visibility}
                onChange={(e) => setVisibility(e.target.checked)}
                className="ml-2 px-3 py-2 border text-black rounded-lg"
              />
              <label htmlFor="visibility" className="ml-2 text-black ">
                Private
              </label>
             
            </div>
          </div> */}

          <div className="flex justify-center mt-8 pt-8 ">
            <button
              type="submit"
              className="px-4 py-2 bg-green-400 hover:bg-green-600 text-white rounded-lg cursor-pointer"
            >
              Add Entry
            </button>
            <button
              type="button"
              className="ml-4 px-4 py-2 bg-red-400 rounded-lg cursor-pointer hover:bg-red-600 text-white"
              onClick={() => {
                onClose();
                setAutoCategorize(false);
                setVisibility(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
