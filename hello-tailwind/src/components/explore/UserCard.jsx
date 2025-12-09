import React from "react";
import { UserPlus, Check } from "lucide-react";

const UserCard = ({ user, onAddFriend, isAdded }) => (
  <div className="flex-shrink-0 w-[45%] sm:w-[30%] md:w-[22%] lg:w-[16%] group">
    <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image with increased height */}
      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
        <img
          src={user.img}
          alt={user.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}&size=400&background=097abe&color=fff`;
          }}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top-right Add Friend / Check icon */}
        <button
          onClick={() => onAddFriend(user)}
          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isAdded ? "bg-green-500 hover:bg-green-600" : "bg-[#097abe] hover:bg-[#065a94]"
          } text-white`}
          aria-label={isAdded ? "Friend added" : "Add friend"}
        >
          {isAdded ? <Check size={18} /> : <UserPlus size={18} />}
        </button>
      </div>

      {/* Bottom overlay with name and course */}
      <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-sm text-center py-1">
        <p className="font-semibold text-sm text-gray-900 truncate">{user.name}</p>
        <p className="text-xs text-gray-500 truncate">{user.course}</p>
      </div>
    </div>
  </div>
);

export default UserCard;
