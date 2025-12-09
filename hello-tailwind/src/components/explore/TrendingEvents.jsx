import React from "react";
import EventCard from "./EventCard";

const TrendingEvents = ({ events }) => {
  if (!events) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Trending Events</h2>
      <a
  href="/events"
className="text-l font-semibold text-blue-600 flex items-center relative group"
>
  See All
  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
    &rarr;
  </span>
  {/* Optional animated underline */}
  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#097abe] transition-all duration-300 group-hover:w-full"></span>
</a>

      </div>

      {/* Horizontal scroll container with left padding */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pl-4 sm:pl-6 md:pl-8 lg:pl-10">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex-shrink-0 w-[80%] sm:w-[45%] md:w-[30%] lg:w-[22%]"
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingEvents;
