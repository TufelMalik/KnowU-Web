import React from "react";
import ClubCard from "./ClubCard";
import { useNavigate } from "react-router-dom";

// Mock club data
const clubsData = [
  {
    name: "Coding Club",
    president: "Alice",
    description: "A club for coding enthusiasts to learn and compete in hackathons.",
    image: "/assets/clubs/coding.jpg",
  },
  {
    name: "Music Club",
    president: "Bob",
    description: "A club for musicians to jam, perform, and organize events.",
    image: "/assets/clubs/music.jpg",
  },
  {
    name: "Art Club",
    president: "Charlie",
    description: "A club for artists to explore creativity and hold exhibitions.",
    image: "/assets/clubs/art.jpg",
  },
  {
    name: "Sports Club",
    president: "David",
    description: "A club for sports enthusiasts to organize tournaments and training sessions.",
    image: "/assets/clubs/sports.jpg",
  },
];

const ClubsPage = () => {
  const navigate = useNavigate();

  const handleJoin = (club) => {
    alert(`Joined ${club.name}!`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Clubs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {clubsData.map((club) => (
          <ClubCard
            key={club.name}
            club={club}
            onJoin={handleJoin}
            // Override handleCardClick to navigate to /clubs/:clubname
            handleCardClick={() => {
              const slug = club.name
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
              navigate(`/clubs/${slug}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ClubsPage;
