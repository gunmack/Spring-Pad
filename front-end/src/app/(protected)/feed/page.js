"use client";

import React, { useState } from "react";
import moment, { weekdays } from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const mLocalizer = momentLocalizer(moment);

const events = [
  {
    title: "Demo Event",
    start: new Date(2026, 2, 4, 10, 0),
    end: new Date(2026, 2, 4, 12, 0),
  },
  {
    title: "Another Event",
    start: new Date(2026, 2, 5, 14, 0),
    end: new Date(2026, 2, 5, 15, 30),
  },
  {
    title: "Month End Event",
    start: new Date(2026, 2, 31, 14, 0),
    end: new Date(2026, 2, 31, 15, 30),
  },
  {
    title: "Multi-Day Event",
    start: new Date(2026, 2, 28, 9, 0),
    end: new Date(2026, 3, 2, 17, 0),
  },
  {
    title: "All Day Event",
    start: new Date(2026, 2, 10, 0, 1),
    end: new Date(2026, 2, 10, 23, 59),
  },
];

const MonthEvents = ({ event }) => {
  return (
    <div className="text-xs sm:text-sm">
      <div className="font-semibold">{event.title}</div>
      {/* <div className="opacity-70">
        {moment(event.start).format("HH:mm")} -{" "}
        {moment(event.end).format("HH:mm")}
      </div> */}
    </div>
  );
};
const WeekEvents = ({ event }) => {
  return (
    <div className="text-xs sm:text-sm">
      <div className="font-semibold">{event.title}</div>
      <div className="opacity-70">
        {moment(event.start).format("HH:mm")} -{" "}
        {moment(event.end).format("HH:mm")}
      </div>
    </div>
  );
};
const DayEvents = ({ event }) => {
  return (
    <div className="text-xs sm:text-sm">
      <div className="font-semibold">{event.title}</div>
      <div className="opacity-70">
        {moment(event.start).format("HH:mm")} -{" "}
        {moment(event.end).format("HH:mm")}
      </div>
    </div>
  );
};

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: { backgroundColor: "lightgreen" },
  });

export default function Feed() {
  const [date, setDate] = useState(() => new Date());
  const [view, setView] = useState("month");

  return (
    <div className="flex flex-col justify-center items-center">
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
