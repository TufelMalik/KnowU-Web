import React from "react";
import { Edit3 } from "lucide-react";
import BlueTick from "./BlueTick"; // import the blue tick component

const ProfileAvatar = ({
  imageSrc = "/assets/user/user15.jpg",
  subtitle,
  isPremium,
  onEdit,
}) => {
  return (
    <div className="flex items-start justify-between pt-4 mb-4">
      <div className="flex items-start space-x-4">
        <div className="relative -mt-20">
          {/* Avatar Image */}
          <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg flex items-center justify-center bg-gray-200">
            <img
              src={imageSrc}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Blue Tick Badge */}
          {isPremium && (
            <div className="absolute -bottom-2 -right-2">
              <BlueTick />
            </div>
          )}
        </div>

        {/* Subtitle */}
        <div className="pt-2">
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>

      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="p-3 bg-[#097abe]/10 text-[#097abe] hover:bg-[#097abe]/20 rounded-xl transition-all duration-200 hover:scale-105"
      >
        <Edit3 size={20} />
      </button>
    </div>
  );
};

export default ProfileAvatar;
