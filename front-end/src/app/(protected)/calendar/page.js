"use client";

import React, { useEffect, useState } from "react";
import moment, { weekdays } from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddEvent from "@/components/addEventModal";
import EventInfo from "@/components/eventInfoModal";
import {
  MonthEvents,
  WeekEvents,
  DayEvents,
  ColoredDateCellWrapper,
} from "./cal-struct";
import { loadEvents } from "./load";
import { useAuth } from "../../context/AuthContext";

const mLocalizer = momentLocalizer(moment);

export default function EventsFeed() {
  const [date, setDate] = useState(() => new Date());
  const [view, setView] = useState("month");
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useAuth();

  const [availableViews, setAvailableViews] = useState([
    "month",
    "week",
    "day",
  ]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      // update calendar immediately
      setEvents((prev) => prev.filter((e) => e.id !== id));

      // close modal
      setSelectedEvent(null);
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await loadEvents(user.uid);
      setEvents(data);
    };

    fetchEvents();
  }, [user.uid]);

  useEffect(() => {
    const updateViews = () => {
      if (window.innerWidth < 768) {
        // md breakpoint ~768px
        setAvailableViews(["month", "day"]); // hide week on small screens
      } else {
        setAvailableViews(["month", "week", "day"]);
      }
    };

    updateViews(); // initial check
    window.addEventListener("resize", updateViews);

    return () => window.removeEventListener("resize", updateViews);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="fixed top-4 right-4 w-12 h-12 bg-blue-600 hover:bg-blue-700text-white rounded-full flex items-center justify-center text-3xl shadow-lg z-50 cursor-pointer"
        onClick={() => setOpenModal(true)}
        title="Add new event"
      >
        +
      </button>

      <AddEvent
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={(savedEvent) => {
          setEvents((prev) => [
            ...prev,
            {
              ...savedEvent,
              start: new Date(savedEvent.start),
              end: new Date(savedEvent.end),
            },
          ]);
          setOpenModal(false);
        }}
      />
      <main className="flex w-full flex-col items-center justify-center py-16">
        <div className="text-black bg-gray-400 rounded-lg p-2 md:w-2/3 text-xs lg:text-lg h-[75vh] w-[95vw]">
          {selectedEvent && (
            <EventInfo
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
              onDelete={handleDelete}
            />
          )}
          <Calendar
            localizer={mLocalizer}
            events={events}
            views={availableViews}
            view={view}
            date={date}
            onSelectEvent={(event) => setSelectedEvent(event)}
            onNavigate={setDate}
            onView={setView}
            step={60}
            showMultiDayTimes
            style={{ height: "100%" }}
            formats={{
              eventTimeRangeFormat: () => "",
            }}
            components={{
              timeSlotWrapper: ColoredDateCellWrapper,
              month: { event: MonthEvents },
              week: { event: WeekEvents },
              day: { event: DayEvents },
            }} // plain object
          />
        </div>
      </main>
    </div>
  );
}
