import React from "react";
import {
  IoChevronBack,
  IoChevronForward,
  IoPlayCircle,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
} from "react-icons/io5";

const PostMedia = ({
  post,
  likedPosts,
  setLikedPosts,
  currentImageIndex,
  setCurrentImageIndex,
  videoRefs,
  playingVideo,
  setPlayingVideo,
  mutedVideos,
  setMutedVideos,
}) => {
  const currentIndex = currentImageIndex[post.id] || 0;
  const hasGallery = post.mediaGallery && post.mediaGallery.length > 1;

  const toggleLike = () => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      newSet.has(post.id) ? newSet.delete(post.id) : newSet.add(post.id);
      return newSet;
    });
  };

  const toggleVideo = () => {
    const video = videoRefs.current[post.id];
    if (video) {
      if (video.paused) {
        video.play();
        setPlayingVideo(post.id);
      } else {
        video.pause();
        setPlayingVideo(null);
      }
    }
  };

  const handleImageNavigation = (direction) => {
    setCurrentImageIndex((prev) => {
      const current = prev[post.id] || 0;
      const total = post.mediaGallery?.length || 1;
      const newIndex =
        direction === "next"
          ? (current + 1) % total
          : current === 0
          ? total - 1
          : current - 1;
      return { ...prev, [post.id]: newIndex };
    });
  };

  return (
    <div className="w-full bg-black relative group">
      {post.type === "image" ? (
        <>
          <img
            src={hasGallery ? post.mediaGallery[currentIndex] : post.media}
            alt="Post media"
            className="w-full h-auto max-h-[350px] object-cover rounded-md"
            onDoubleClick={toggleLike}
          />
          {hasGallery && (
            <>
              <button
                onClick={() => handleImageNavigation("prev")}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <IoChevronBack className="text-white" />
              </button>
              <button
                onClick={() => handleImageNavigation("next")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <IoChevronForward className="text-white" />
              </button>
            </>
          )}
        </>
      ) : (
        <div className="relative">
          <video
            ref={(el) => (videoRefs.current[post.id] = el)}
            src={post.media}
            className="w-full max-h-[350px] object-cover rounded-md"
            loop
            playsInline
            muted={mutedVideos.has(post.id)}
            onDoubleClick={toggleLike}
          />
          {playingVideo !== post.id && (
            <button
              onClick={toggleVideo}
              className="absolute inset-0 flex items-center justify-center"
            >
              <IoPlayCircle className="text-white text-6xl opacity-80" />
            </button>
          )}
          <button
            onClick={() =>
              setMutedVideos((prev) => {
                const newSet = new Set(prev);
                newSet.has(post.id) ? newSet.delete(post.id) : newSet.add(post.id);
                return newSet;
              })
            }
            className="absolute bottom-3 right-3 bg-black/40 hover:bg-black/70 p-2 rounded-full"
          >
            {mutedVideos.has(post.id) ? (
              <IoVolumeMuteOutline className="text-white text-xl" />
            ) : (
              <IoVolumeHighOutline className="text-white text-xl" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostMedia;
