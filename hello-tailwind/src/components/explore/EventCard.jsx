import React from "react";
import { Calendar, MapPin } from "lucide-react";

const EventCard = ({ event }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden w-full h-full group">
    {/* Event Image */}
    <div className="relative w-full h-48 sm:h-56">
      <img
        src={event.img}
        alt={event.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            event.title
          )}&size=400&background=097abe&color=fff`;
        }}
      />

      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3">
        <div className="text-white space-y-1">
          <p className="font-semibold text-sm sm:text-base">{event.title}</p>
          {event.date && (
            <p className="flex items-center text-xs sm:text-sm opacity-90">
              <Calendar size={14} className="mr-1" /> {event.date}
            </p>
          )}
          {event.location && (
            <p className="flex items-center text-xs sm:text-sm opacity-90">
              <MapPin size={14} className="mr-1" /> {event.location}
            </p>
          )}
        </div>
      </div>

  {/* Badge */}
{/* Badge */}
{event.tag && (
  <span
    className="absolute top-2 right-2 px-3 py-1.5 text-sm font-semibold rounded-full text-white shadow-lg transform transition-all duration-300 group-hover:scale-110"
    style={{
      background: "linear-gradient(135deg, #097abe, #0590d6)",
      boxShadow: "0 4px 15px rgba(9, 122, 190, 0.4)",
      animation: "float 3s ease-in-out infinite",
    }}
  >
    {event.tag}
  </span>
)}



    </div>

    {/* Static Info */}
    <div className="p-4">
      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
        {event.title}
      </p>
      <p className="text-gray-600 mt-1 text-xs sm:text-sm truncate">
        {event.date || "Date TBA"}
      </p>
    </div>
  </div>
);

export default EventCard;
