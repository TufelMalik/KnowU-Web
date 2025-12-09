import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import EventsTab from "./clubs/EventsTab";
import MembersTab from "./clubs/MembersTab";
import PhotosTab from "./clubs/PhotosTab";
import ClubHeader from "./clubs/ClubHeader"; // import the header component

// Mock data – in real app, fetch from API or context
const clubsData = [
  {
    name: "Coding Club",
    president: "Alice",
    description: "A club for coding enthusiasts to learn and compete in hackathons.",
    image: "/assets/clubs/coding.jpg",
    members: ["Alice", "Bob", "Charlie"],
    events: ["Hackathon 2025", "Code Jam", "Monthly Meetup"],
    photos: ["/assets/clubs/coding1.jpg", "/assets/clubs/coding2.jpg"],
  },
  {
    name: "Music Club",
    president: "Bob",
    description: "A club for musicians to jam, perform, and organize events.",
    image: "/assets/clubs/music.jpg",
    members: ["Bob", "Eve", "Mallory"],
    events: ["Annual Concert", "Open Mic Night"],
    photos: ["/assets/clubs/music1.jpg", "/assets/clubs/music2.jpg"],
  },
];

const ClubDetail = () => {
  const { clubname } = useParams();
  const [club, setClub] = useState(null);
  const [joined, setJoined] = useState(false);
  const [activeTab, setActiveTab] = useState("events");

  useEffect(() => {
    const clubFound = clubsData.find(
      (c) =>
        c.name.toLowerCase().replace(/\s+/g, "-") === clubname.toLowerCase()
    );
    setClub(clubFound);
  }, [clubname]);

  if (!club)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Club not found
      </div>
    );

  return (
    <div className="w-full">
      {/* Top bar with back button and club name */}
      <ClubHeader clubName={club.name} />

      {/* Banner Image below the club name */}
      <div className="w-full h-72">
        <img
          src={club.image}
          alt={club.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Join Button below image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => setJoined(!joined)}
          className={`w-full py-3 text-white font-semibold text-center rounded-lg shadow-md transition-colors duration-300 ${
            joined
              ? "bg-gray-400 hover:bg-gray-500"
              : "bg-[#097abe] hover:bg-[#076ba0]"
          }`}
        >
          {joined ? "Joined" : "Join Club"}
        </motion.button>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Club Description */}
        <p className="text-gray-700 mb-6">{club.description}</p>

        {/* Tabs */}
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            {["events", "members", "photos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-[#097abe] text-[#097abe]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "events"
                  ? "Upcoming Events"
                  : tab === "members"
                  ? "Members"
                  : "Photos"}
              </button>
            ))}
          </div>

          <div className="text-gray-700">
            {activeTab === "events" && <EventsTab events={club.events} />}
            {activeTab === "members" && <MembersTab members={club.members} />}
            {activeTab === "photos" && <PhotosTab photos={club.photos} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetail;
