import React from "react";
import moment from "moment";

export const MonthEvents = ({ event }) => {
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

export const WeekEvents = ({ event }) => {
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

export const DayEvents = ({ event }) => {
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

export const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: { backgroundColor: "lightgreen" },
  });
