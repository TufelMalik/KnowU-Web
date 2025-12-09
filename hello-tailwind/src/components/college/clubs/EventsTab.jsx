import React from "react";
import { Eye } from "lucide-react"; // eye icon

const EventsTab = ({ events }) => {
  return (
    <div className="flex flex-col gap-3">
      {events.map((event, idx) => {
        // For demo, use dummy data for date, description, and time
        const eventDate = new Date();
        eventDate.setDate(eventDate.getDate() + idx);
        const day = eventDate.getDate();
        const month = eventDate.toLocaleString("default", { month: "short" });

        const description = "This is a brief description of the event."; // replace with actual
        const time = "5:00 PM - 7:00 PM"; // replace with actual

        return (
          <div
            key={idx}
            className="flex items-center justify-between bg-white rounded-lg shadow-sm p-3"
          >
            {/* Left: Date box */}
            <div className="flex flex-col items-center justify-center w-16 h-16 bg-[#097abe] text-white rounded-lg text-center">
              <span className="text-lg font-bold">{day}</span>
              <span className="text-sm">{month}</span>
            </div>

            {/* Middle: Event details */}
            <div className="flex-1 px-4">
              <h3 className="text-gray-800 font-semibold">{event}</h3>
              <p className="text-gray-500 text-sm">{description}</p>
              <p className="text-gray-400 text-xs mt-1">{time}</p>
            </div>

            {/* Right: Eye icon */}
            <div className="text-gray-500 hover:text-[#097abe] cursor-pointer">
              <Eye size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventsTab;
