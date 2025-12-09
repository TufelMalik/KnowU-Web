 import React, { useState } from "react";
import EventCard from "./EventCard";
import TagFilter from "./TagFilter";
import SearchBar from "./SearchBar2"; // Your upgraded SearchBar

const EventsPage = () => {
  const allEvents = [
    { id: 1, title: "Tech Fest 2025", date: "Oct 15, 2025", img: "/assets/events/event1.jpg", tag: "Tech" },
    { id: 2, title: "Design Workshop", date: "Oct 20, 2025", img: "/assets/events/event2.jpg", tag: "Design" },
    { id: 3, title: "Music Concert", date: "Nov 5, 2025", img: "/assets/events/event3.jpg", tag: "Music" },
    { id: 4, title: "Startup Meetup", date: "Nov 10, 2025", img: "/assets/events/event4.jpg", tag: "Startup" },
    { id: 5, title: "Art Exhibition", date: "Nov 18, 2025", img: "/assets/events/event5.jpg", tag: "Art" },
    { id: 6, title: "AI Conference", date: "Dec 1, 2025", img: "/assets/events/event6.jpg", tag: "Tech" },
    { id: 7, title: "Photography Masterclass", date: "Dec 5, 2025", img: "/assets/events/event7.jpg", tag: "Art" },
  ];

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  const tags = ["All", ...new Set(allEvents.map((e) => e.tag))];

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === "All" || event.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <section className="mt-10 px-4 md:px-8 lg:px-16">
<h2 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left text-gray-900">
  Explore <span style={{ color: "#097abe" }}>Events</span>
</h2>



      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <SearchBar search={search} setSearch={setSearch} placeholder="Search events..." />
        <TagFilter tags={tags} selectedTag={selectedTag} onSelectTag={setSelectedTag} />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="w-full transform hover:scale-105 transition-transform duration-300"
            >
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-10 text-lg">
            No events found. Try adjusting your search or filter.
          </p>
        )}
      </div>
    </section>
  );
};

export default EventsPage;

