import React from "react";

const ProfileBanner = ({ name, followers, following, posts }) => {
  return (
    <div className="h-40 bg-gradient-to-r from-[#097abe] to-[#0a5d8a] relative">
      {/* Stats Row at the top */}
      <div className="absolute top-4 left-0 w-full flex justify-around items-center text-white">
        <div className="flex flex-col items-center">
          <span className="text-sm">Followers</span>
          <span className="text-3xl font-bold">{followers}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm">Following</span>
          <span className="text-3xl font-bold">{following}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm">Posts</span>
          <span className="text-3xl font-bold">{posts}</span>
        </div>
      </div>

      {/* Name at original position */}
      <div className="absolute bottom-4 left-40">
        <h2 className="text-2xl font-bold text-white">{name}</h2>
      </div>
    </div>
  );
};

export default ProfileBanner;
