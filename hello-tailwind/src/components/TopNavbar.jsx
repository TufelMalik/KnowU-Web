// components/TopNavbar.jsx
import React, { useRef } from "react";
import { GiHummingbird } from "react-icons/gi";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TopNavbar = ({ onFileUpload }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleBirdClick = () => {
    navigate("/inbox");
  };

  const handlePlusClick = () => {
    // Trigger hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && onFileUpload) {
      onFileUpload(file); // send uploaded file to parent component
    }
  };

  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-4xl font-extrabold">
        <span className="text-black">Know</span>
        <span className="text-[#097abe]">U</span>
      </h1>

      <div className="flex items-center gap-3">
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*,video/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Upload button */}
        <div
          className="bg-[#097abe] rounded-full p-2.5 cursor-pointer hover:bg-[#065a94] transition-all duration-200 flex items-center justify-center"
          onClick={handlePlusClick}
        >
          <FiPlus className="text-base text-white" />
        </div>

        {/* Hummingbird icon */}
        <GiHummingbird
          className="text-4xl text-gray-700 cursor-pointer hover:text-[#097abe] transition-colors"
          onClick={handleBirdClick}
        />
      </div>
    </div>
  );
};

export default TopNavbar;
