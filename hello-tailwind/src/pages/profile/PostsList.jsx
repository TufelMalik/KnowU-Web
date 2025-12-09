import React, { useState } from "react";
import { Heart } from "lucide-react";

const PostsList = ({ posts }) => {
  // Track likes for each post
  const [postLikes, setPostLikes] = useState(
    posts.map((post) => ({ ...post })) // copy posts with id, likes, title
  );

  const handleLike = (id) => {
    setPostLikes((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  return (
    <div className="flex flex-wrap gap-4">
      {postLikes.map((post, index) => {
        const imgIndex = 1 + (index + 14); // user10.jpg → user20.jpg
        const imgSrc = `/assets/user/user${imgIndex}.jpg`;

        return (
          <div
            key={post.id}
            className="flex-shrink-0 w-[45%] sm:w-[30%] md:w-[22%] lg:w-[16%] group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Post image */}
              <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
                <img
                  src={imgSrc}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Top-right Like button */}
              <button
                onClick={() => handleLike(post.id)}
                className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
                  post.isLiked
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-white hover:bg-gray-100 text-red-500"
                }`}
                aria-label={post.isLiked ? "Liked" : "Like post"}
              >
                <Heart size={18} className={post.isLiked ? "fill-current" : ""} />
              </button>

              {/* Bottom overlay with title and likes */}
              <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-sm text-center py-1 px-2">
                <p className="font-semibold text-sm text-gray-900 truncate">{post.title}</p>
                <p className="text-xs text-gray-500 truncate">{post.likes} Likes</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostsList;
