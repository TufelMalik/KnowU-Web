import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PhoneIcon, VideoCameraIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

const ChatHeader = ({ chatName }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4 w-full">
      {/* Left: Back arrow + username */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate(-1)}>
        <ArrowLeftIcon className="w-6 h-6 text-black mr-3" />
        <span className="font-semibold text-gray-800">{chatName.replace(/-/g, " ")}</span>
      </div>

      {/* Right: action icons */}
      <div className="flex items-center space-x-4">
        <PhoneIcon className="w-6 h-6 text-gray-700 cursor-pointer" />
        <VideoCameraIcon className="w-6 h-6 text-gray-700 cursor-pointer" />
        <EllipsisVerticalIcon className="w-6 h-6 text-gray-700 cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatHeader;
