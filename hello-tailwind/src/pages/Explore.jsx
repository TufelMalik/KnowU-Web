import React, { useState } from "react";
import SearchBar from "../components/explore/SearchBar";
import SuggestedConnections from "../components/explore/SuggestedConnections";
import TrendingStudents from "../components/explore/TrendingStudents";
import TrendingEvents from "../components/explore/TrendingEvents";

// Sample Users
const sampleUsers = [
  { id: 1, name: "Rahul Sharma", course: "Computer Science", img: "/assets/user/user1.jpg" },
  { id: 2, name: "Ananya Singh", course: "Business Administration", img: "/assets/user/user2.jpg" },
  { id: 3, name: "Karan Verma", course: "Mechanical Engineering", img: "/assets/user/user3.jpg" },
  { id: 4, name: "Priya Mehta", course: "Design", img: "/assets/user/user4.jpg" },
  { id: 5, name: "Arjun Gupta", course: "Electrical Engineering", img: "/assets/user/user5.jpg" },
  { id: 6, name: "Neha Kapoor", course: "Marketing", img: "/assets/user/user6.jpg" },
];

// Trending Students
const trendingUsers = [
  { id: 7, name: "Arshi", course: "Data Science", img: "/assets/user/user7.jpg" },
  { id: 8, name: "Sanya", course: "Civil Engineering", img: "/assets/user/user8.jpg" },
  { id: 9, name: "Meera", course: "Finance", img: "/assets/user/user9.jpg" },
  { id: 10, name: "Tanya", course: "Psychology", img: "/assets/user/user11.jpg" },
  { id: 11, name: "Kavya", course: "Law", img: "/assets/user/user12.jpg" },
];

// Trending Events
const trendingEvents = [
  { id: 1, title: "Tech Fest 2025", date: "Oct 15, 2025", img: "/assets/events/event1.jpg" },
  { id: 2, title: "Design Workshop", date: "Oct 20, 2025", img: "/assets/events/event2.jpg" },
  { id: 3, title: "Music Concert", date: "Nov 5, 2025", img: "/assets/events/event3.jpg" },
  { id: 4, title: "Startup Meetup", date: "Nov 10, 2025", img: "/assets/events/event4.jpg" },
  { id: 5, title: "Art Exhibition", date: "Nov 18, 2025", img: "/assets/events/event5.jpg" },
];

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [addedFriends, setAddedFriends] = useState(new Set());

  const handleAddFriend = (user) => {
    setAddedFriends((prev) => {
      const newSet = new Set(prev);
      newSet.has(user.id) ? newSet.delete(user.id) : newSet.add(user.id);
      return newSet;
    });
  };

  const filteredSampleUsers = sampleUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTrendingUsers = trendingUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTrendingEvents = trendingEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={() => {}} />

      <div className="max-w-7xl mx-auto px-4 pb-8">
        {filteredSampleUsers.length > 0 && (
          <SuggestedConnections users={filteredSampleUsers} onAddFriend={handleAddFriend} addedFriends={addedFriends} />
        )}
        {filteredTrendingUsers.length > 0 && (
          <TrendingStudents users={filteredTrendingUsers} onAddFriend={handleAddFriend} addedFriends={addedFriends} />
        )}
        {filteredTrendingEvents.length > 0 && <TrendingEvents events={filteredTrendingEvents} />}
      </div>
    </div>
  );
};

export default ExplorePage;
