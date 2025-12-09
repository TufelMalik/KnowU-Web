import React from "react";
import { useNavigate } from "react-router-dom";

const ChatList = ({ activeTab, searchQuery }) => {
  const navigate = useNavigate();

  const chats = [
    { name: "Aditi Sharma", message: "Hey! Are you free today?", time: "10:15 AM", img: "/assets/user/user2.jpg", tab: "Personal", online: true },
    { name: "Preeti Verma", message: "Project update submitted.", time: "09:50 AM", img: "/assets/user/user16.jpg", tab: "Batch" },
    { name: "Ananya Singh", message: "Can we meet tomorrow?", time: "Yesterday", img: "/assets/user/user18.jpg", tab: "Personal", online: false },
    { name: "Tech Club", message: "New event this Friday!", time: "08:30 AM", img: "/assets/user/user15.jpg", tab: "Club" },
    { name: "Harshita Mehta", message: "Finished the assignment.", time: "12:00 PM", img: "/assets/user/user8.jpg", tab: "Batch" },
  ];

  let filteredChats = chats.filter(chat => chat.tab === activeTab);

  if (searchQuery.trim() !== "") {
    filteredChats = filteredChats.filter(chat =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleChatClick = (chat) => {
    // Replace spaces in name for URL
    const chatRoute = chat.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/inbox/${chatRoute}`); // <-- Correct path
  };

  return (
    <div className="space-y-3 w-full">
      {filteredChats.length === 0 && (
        <p className="text-gray-400 text-center mt-10">No chats found.</p>
      )}

      {filteredChats.map((chat, index) => (
        <div
          key={index}
          onClick={() => handleChatClick(chat)}
          className="flex items-center py-3 border-b border-gray-200 cursor-pointer"
        >
          <div className="relative flex-shrink-0">
            <img
              src={chat.img}
              alt={chat.name}
              className="w-16 h-16 object-cover rounded-xl"
            />
            {chat.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>

          <div className="ml-4 flex-1 overflow-hidden">
            <h2 className="font-semibold text-gray-800 text-base truncate">{chat.name}</h2>
            <p className="text-gray-500 text-sm truncate mt-1">{chat.message}</p>
          </div>

          <div className="text-gray-400 text-xs flex-shrink-0">{chat.time}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
