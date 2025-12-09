import React from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";

const SuggestedConnections = ({ users, onAddFriend, addedFriends }) => (
  <section className="mt-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-gray-900">Suggested Connections</h2>
      <Link
        to="/suggestedconnections"
        className="text-blue-600 font-semibold flex items-center gap-1 hover:underline"
      >
        See All <span className="text-xl">→</span>
      </Link>
    </div>
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

export default SuggestedConnections;
