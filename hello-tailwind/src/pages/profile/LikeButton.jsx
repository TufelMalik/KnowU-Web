import React from "react";
import { Heart } from "lucide-react";

const LikeButton = ({ isLiked, onLike }) => {
  return (
    <button
      className={`p-2 rounded-full transition-colors duration-200 ${
        isLiked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
      } absolute top-20 right-6`} // slightly up from top-36
      onClick={onLike}
      title="Like"
    >
      <Heart size={18} className={isLiked ? "fill-current" : ""} />
    </button>
  );
};

export default LikeButton;
