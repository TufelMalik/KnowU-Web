// TrendingStudentsPage.jsx
import React, { useState } from "react";
import SearchBar from "./SearchBar2";
import UserCard2 from "./UserCard2";
import TagFilter2 from "./TagFilter2";

const trendingUsers = [
  { id: 7, name: "Arshi", course: "Data Science", img: "/assets/user/user7.jpg" },
  { id: 8, name: "Sanya", course: "Civil Engineering", img: "/assets/user/user8.jpg" },
  { id: 9, name: "Meera", course: "Finance", img: "/assets/user/user9.jpg" },
  { id: 10, name: "Tanya", course: "Psychology", img: "/assets/user/user11.jpg" },
  { id: 11, name: "Kavya", course: "Law", img: "/assets/user/user12.jpg" },
];

const TrendingStudentsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [addedFriends, setAddedFriends] = useState(new Set());

  // Handler to add friend
  const handleAddFriend = (user) => {
    setAddedFriends((prev) => new Set(prev).add(user.id));
  };

  // Unique list of courses/tags
  const courses = ["All", ...new Set(trendingUsers.map((u) => u.course))];

  // Filter users by search and tag
  const filteredUsers = trendingUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag === "All" || user.course === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <section className="mt-6 px-2 sm:px-4 md:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Trending Students
      </h2>

      {/* Search Bar */}
      <div className="mb-4">
        <SearchBar search={search} setSearch={setSearch} placeholder="Search students..." />
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
          <p className="col-span-full text-center text-gray-500 mt-10">No students found.</p>
        )}
      </div>
    </section>
  );
};

export default TrendingStudentsPage;
