import React, { useState } from "react";
import UpdateCard from "../components/college/UpdateCard";
import DepartmentCard from "../components/college/DepartmentCard";
import ClubCard from "../components/college/ClubCard";
import SearchBarWithTags from "../components/college/SearchBarWithTags";
import { Settings } from "lucide-react";

const updates = [
  {
    id: 1,
    title: "CR Update",
    name: "Ananya Singh",
    description: "Class timings have been updated. Check new schedule.",
    image: "/assets/user/user2.jpg",
    tags: ["Schedule", "Important", "Class", "Timings", "Notice", "Urgent"],
    date: "Oct 6, 2025",
  },
  {
    id: 2,
    title: "Professor Update",
    name: "Dr. Sharma",
    description: "Assignment submission deadline extended to Friday.",
    image: "/assets/user/user4.jpg",
    tags: ["Deadline", "Assignment", "Submission", "Reminder", "Homework", "Grades"],
    date: "Oct 5, 2025",
  },
  {
    id: 3,
    title: "Event Update",
    name: "Annual Fest",
    description: "Annual Fest is happening tomorrow in the auditorium.",
    image: "/assets/events/event2.jpg",
    tags: ["Fest", "Event", "Join", "Music", "Games", "Fun"],
    date: "Oct 4, 2025",
  },
];

const departments = [
  { id: 1, name: "USAR", image: "/assets/departments/btech.jpg" },
  { id: 2, name: "USMC", image: "/assets/departments/mass_comm.jpg" },
  { id: 3, name: "USAP", image: "/assets/departments/arts_psy.jpg" },
  { id: 4, name: "USDI", image: "/assets/departments/design.jpg" },
];


const clubs = [
  { id: 1, name: "Music Club", president: "Riya Singh", image: "/assets/clubs/music.jpg" },
  { id: 2, name: "Drama Club", president: "Aman Verma", image: "/assets/clubs/drama.jpg" },
  { id: 3, name: "Photography Club", president: "Neha Kapoor", image: "/assets/clubs/photo.jpg" },
];

const College = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Updates");

  const allTags = [...new Set(updates.flatMap((update) => update.tags))].sort((a, b) =>
    a.localeCompare(b)
  );

  const filteredUpdates = updates
    .filter(
      (update) =>
        update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        update.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (update) =>
        selectedTags.length === 0 ||
        selectedTags.some((tag) => update.tags.includes(tag))
    );

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine grid classes based on active filter
  const getGridClasses = () => {
    if (activeFilter === "Departments") return "grid grid-cols-2 gap-4 mt-6"; // 2 per row on all screens
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"; // default for Updates & Clubs
  };

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 flex-1 text-center">
          My University
        </h1>
        <div className="relative">
          <div
            className="cursor-pointer p-2 rounded-full hover:bg-gray-200 transition"
            title="Settings"
          >
            <Settings size={24} className="text-gray-700 hover:text-blue-600" />
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <SearchBarWithTags
        allTags={allTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Filter Switch */}
      <div className="mt-6 flex justify-center gap-12 border-b border-gray-300 pb-2">
        {["Updates", "Departments", "Clubs"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-2 text-base font-medium transition-colors duration-300 ${
              activeFilter === filter
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-700 border-b-2 border-transparent"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid Section */}
      <main className={getGridClasses()}>
        {activeFilter === "Updates" &&
          (filteredUpdates.length > 0 ? (
            filteredUpdates.map((update) => <UpdateCard key={update.id} update={update} />)
          ) : (
            <p className="text-gray-500 col-span-full text-center">No updates found.</p>
          ))}

        {activeFilter === "Departments" &&
          (filteredDepartments.length > 0 ? (
            filteredDepartments.map((dept) => <DepartmentCard key={dept.id} department={dept} />)
          ) : (
            <p className="text-gray-500 col-span-full text-center">No departments found.</p>
          ))}

        {activeFilter === "Clubs" &&
          (filteredClubs.length > 0 ? (
            filteredClubs.map((club) => <ClubCard key={club.id} club={club} />)
          ) : (
            <p className="text-gray-500 col-span-full text-center">No clubs found.</p>
          ))}
      </main>
    </div>
  );
};

export default College;
