import React from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";

const TrendingStudents = ({ users, onAddFriend, addedFriends }) => (
  <section className="mt-10">
    {/* Header with See All */}
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-gray-900">Trending Students</h2>
      <Link
        to="/trendingstudents"
        className="text-blue-600 font-semibold flex items-center gap-1 hover:underline"
      >
        See All <span className="text-xl">→</span>
      </Link>
    </div>

    {/* Horizontal scrollable student cards */}
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-4 pb-2">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onAddFriend={onAddFriend}
            isAdded={addedFriends.has(user.id)}
          />
        ))}
      </div>
    </div>
  </section>
);

export default TrendingStudents;
