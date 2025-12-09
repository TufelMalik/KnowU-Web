import React, { useState } from "react";
import TopNavbar from "./TopNavbar";
import SearchBar from "./SearchBar";
import Tabs from "./Tabs";
import FloatingButton from "./FloatingButton";
import ChatList from "./ChatList";

const Inbox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Personal");

  return (
    <div className="min-h-screen bg-white relative flex flex-col">
      {/* Top Navbar */}
      <div className="sticky top-0 z-30 bg-white">
        <TopNavbar />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Chat content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        <ChatList activeTab={activeTab} searchQuery={searchQuery} />
      </div>

      {/* Floating Button */}
      <FloatingButton />
    </div>
  );
};

export default Inbox;
