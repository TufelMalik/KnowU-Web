import React, { useState } from "react";
import { Plus, Check, X, ThumbsUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GroupFeed = () => {
  const user = {
    name: "Aditi Sharma",
    role: "CR",
    img: "/assets/user/user5.jpg",
  };

  const [cards, setCards] = useState([
    {
      title: "Student",
      subtitle: "Project discussion today in lab 2.",
      img: "/assets/user/user2.jpg",
      time: "2h ago",
      liked: false,
      likesCount: 0,
    },
    {
      title: "CR",
      subtitle: "Upcoming exam schedule released by department.",
      img: "/assets/user/user5.jpg",
      time: "4h ago",
      liked: false,
      likesCount: 0,
    },
    {
      title: "Faculty",
      subtitle: "Lecture notes uploaded for Unit 3.",
      img: "/assets/user/user8.jpg",
      time: "1d ago",
      liked: false,
      likesCount: 0,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newFeed, setNewFeed] = useState({ subtitle: "" });

  const handleAddFeed = () => setShowForm(true);

  const handleSaveFeed = () => {
    if (newFeed.subtitle.trim()) {
      const newCard = {
        title: user.role,
        subtitle: newFeed.subtitle,
        img: user.img,
        time: "Just now",
        liked: false,
        likesCount: 0,
      };
      setCards((prev) => [newCard, ...prev]);
      setNewFeed({ subtitle: "" });
      setShowForm(false);
    } else {
      alert("Please enter a feed description.");
    }
  };

  const handleCancel = () => {
    setNewFeed({ subtitle: "" });
    setShowForm(false);
  };

  const toggleLike = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) => {
        if (i === index) {
          const liked = !card.liked;
          return {
            ...card,
            liked,
            likesCount: liked ? card.likesCount + 1 : card.likesCount - 1,
          };
        }
        return card;
      })
    );
  };

  const handleDragEnd = (index, info) => {
    if (info.point.x > 80) toggleLike(index);
    if (info.point.x < -80) toggleLike(index);
  };

  return (
    <>
      <div className="flex flex-col gap-4 pb-28 max-w-xl mx-auto">
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="border rounded-2xl shadow-md p-5 bg-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h2 className="font-semibold text-[#097abe]">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>

              <textarea
                placeholder="What's on your mind?"
                value={newFeed.subtitle}
                onChange={(e) => setNewFeed({ subtitle: e.target.value })}
                className="w-full border rounded-lg p-3 mb-1 outline-none focus:ring-2 focus:ring-[#097abe] min-h-[90px] resize-none"
              />
              <p className="text-right text-xs text-gray-400 mb-3">
                {newFeed.subtitle.length}/280
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 text-gray-600 border px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
                >
                  <X size={16} /> Cancel
                </button>
                <button
                  onClick={handleSaveFeed}
                  className="flex items-center gap-1 bg-[#097abe] text-white px-4 py-1.5 rounded-lg hover:bg-[#08689e] transition"
                >
                  <Check size={16} /> Post
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative flex flex-col border rounded-2xl shadow-sm p-4 hover:shadow-md bg-white transition"
          >
            {/* Like Icon Top Right */}
            <div
              className={`absolute top-3 right-3 flex items-center gap-1 cursor-pointer ${
                card.liked ? "text-[#097abe]" : "text-gray-400"
              }`}
              onClick={() => toggleLike(index)}
            >
              <ThumbsUp size={18} />
              {card.likesCount > 0 && (
                <span className="text-xs font-semibold">{card.likesCount}</span>
              )}
            </div>

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => handleDragEnd(index, info)}
              whileTap={{ scale: 0.98 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex items-start gap-4 cursor-grab select-none"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 flex flex-col">
                <h2 className="font-semibold text-lg">{card.title}</h2>
                <p className="text-gray-700 mt-1 leading-snug">{card.subtitle}</p>
                
                {/* Slightly shifted time at bottom-right */}
                <div className="flex justify-end mt-auto">
                  <p className="text-xs text-gray-500 relative translate-y-1">{card.time}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {!showForm && (
        <motion.button
          onClick={handleAddFeed}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-36 right-6 z-50 flex items-center gap-2 bg-[#097abe] text-white rounded-full px-5 py-3 shadow-lg hover:bg-[#08689e] transition-all duration-200"
        >
          <Plus size={22} />
          <span className="font-medium">Create Post</span>
        </motion.button>
      )}
    </>
  );
};

export default GroupFeed;
