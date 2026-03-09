"use client";

import React, { useEffect, useState } from "react";
import moment, { weekdays } from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const mLocalizer = momentLocalizer(moment);

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
  const [events, setEvents] = useState([]);

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
