// SuggestedConnectionsPage.jsx
import React, { useState } from "react";
import SearchBar from "./SearchBar2";
import UserCard2 from "./UserCard2";
import TagFilter2 from "./TagFilter2"; // Make sure this matches your component file name

const sampleUsers = [
  { id: 1, name: "Rahul Sharma", course: "Computer Science", img: "/assets/user/user1.jpg" },
  { id: 2, name: "Ananya Singh", course: "Business Administration", img: "/assets/user/user2.jpg" },
  { id: 3, name: "Karan Verma", course: "Mechanical Engineering", img: "/assets/user/user3.jpg" },
  { id: 4, name: "Priya Mehta", course: "Design", img: "/assets/user/user4.jpg" },
  { id: 5, name: "Arjun Gupta", course: "Electrical Engineering", img: "/assets/user/user5.jpg" },
  { id: 6, name: "Neha Kapoor", course: "Marketing", img: "/assets/user/user6.jpg" },
];

const SuggestedConnectionsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [addedFriends, setAddedFriends] = useState(new Set());

  // Function to add a friend
  const handleAddFriend = (user) => {
    setAddedFriends((prev) => new Set(prev).add(user.id));
  };

  // Unique list of courses/tags
  const courses = ["All", ...new Set(sampleUsers.map((u) => u.course))];

  // Filter users by search and selected tag
  const filteredUsers = sampleUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === "All" || user.course === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <section className="mt-6 px-2 sm:px-4 md:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Suggested Connections
      </h2>

      {/* Search Bar */}
      <div className="mb-4">
        <SearchBar search={search} setSearch={setSearch} placeholder="Search users..." />
      </div>

      {/* Tag Filter */}
      <TagFilter2 tags={courses} selectedTag={selectedTag} onSelectTag={setSelectedTag} />

      {/* Users Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard2
              key={user.id}
              user={user}
              onAddFriend={handleAddFriend} // ✅ internal handler
              isAdded={addedFriends.has(user.id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-10">No users found.</p>
        )}
      </div>
    </section>
  );
};

export default SuggestedConnectionsPage;
