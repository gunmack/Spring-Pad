"use client";

import React, { useEffect, useState } from "react";
import moment, { weekdays } from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { handleAdd } from "./addEvent";
import AddModal from "@/components/addModal";
import {
  MonthEvents,
  WeekEvents,
  DayEvents,
  ColoredDateCellWrapper,
} from "./cal-struct";

const mLocalizer = momentLocalizer(moment);

export default function EventsFeed() {
  const [date, setDate] = useState(() => new Date());
  const [view, setView] = useState("month");
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetch("/data/events.json")
      .then((response) => response.json())
      .then((data) => {
        const convertedEvents = data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(convertedEvents);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="fixed top-4 right-4 w-12 h-12 bg-blue-600 hover:bg-blue-700text-white rounded-full flex items-center justify-center text-3xl shadow-lg z-50 cursor-pointer"
        onClick={() => setOpenModal(true)}
        title="Create new entry"
      >
        +
      </button>

      <AddModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAdd}
      />
      <main className="flex w-full flex-col items-center justify-center py-16">
        <div className="text-black bg-gray-400 rounded-lg p-2 w-full md:w-2/3 text-xs lg:text-lg h-[75vh]">
          <Calendar
            localizer={mLocalizer}
            events={events}
            views={["month", "week", "day"]}
            view={view}
            date={date}
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
