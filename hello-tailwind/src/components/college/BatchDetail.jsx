import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
import GroupFeed from "./tabs/GroupFeed";
import Members from "./tabs/Members";
import Resource from "./tabs/Resource";

const sampleStudents = [
  { name: "Rahul Sharma", img: "/assets/user/user1.jpg", role: "CR" },
  { name: "Ananya Singh", img: "/assets/user/user2.jpg", role: "CR" },
];

const BatchDetail = () => {
  const { batch } = useParams();
  const navigate = useNavigate();
  const [addedFriends, setAddedFriends] = useState([]);
  const [activeTab, setActiveTab] = useState("groupFeed");

  const handleToggleFriend = (student) => {
    setAddedFriends((prev) =>
      prev.includes(student.name)
        ? prev.filter((name) => name !== student.name)
        : [...prev, student.name]
    );
  };

  const handleJoinNow = () => {
    alert("You clicked Join Now!"); // Replace with your join logic
  };

  const mainColor = "#097abe";

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 hover:brightness-110 transition"
        style={{ color: mainColor }}
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Users size={32} style={{ color: mainColor }} />
          <h1 className="text-3xl font-bold text-black">
            {decodeURIComponent(batch)}
          </h1>
        </div>

        {/* Join Now Button */}
        <button
          onClick={handleJoinNow}
          className="px-4 py-2 rounded-lg font-semibold text-white hover:brightness-110 transition"
          style={{ backgroundColor: mainColor }}
        >
          Join Now
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab("groupFeed")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "groupFeed"
              ? "border-b-2"
              : "text-gray-600"
          }`}
          style={activeTab === "groupFeed" ? { borderColor: mainColor, color: mainColor } : {}}
        >
          Batch Feed
        </button>
        <button
          onClick={() => setActiveTab("members")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "members"
              ? "border-b-2"
              : "text-gray-600"
          }`}
          style={activeTab === "members" ? { borderColor: mainColor, color: mainColor } : {}}
        >
          Members
        </button>
        <button
          onClick={() => setActiveTab("resource")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "resource"
              ? "border-b-2"
              : "text-gray-600"
          }`}
          style={activeTab === "resource" ? { borderColor: mainColor, color: mainColor } : {}}
        >
          Resource
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "groupFeed" && <GroupFeed />}
      {activeTab === "members" && (
        <Members
          students={sampleStudents}
          addedFriends={addedFriends}
          onToggleFriend={handleToggleFriend}
        />
      )}
      {activeTab === "resource" && <Resource />}
    </div>
  );
};

export default BatchDetail;
