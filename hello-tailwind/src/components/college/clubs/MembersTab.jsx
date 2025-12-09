import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lightbox from "./Lightbox";
import UserCard2 from "../../explore/UserCard2";

const MembersTab = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [addedFriends, setAddedFriends] = useState([]);

  // Realistic female member names and courses
  const members = [
    { name: "Aarohi Sharma", img: "/assets/user/user13.jpg", course: "B.Tech CSE" },
    { name: "Kiba Khan", img: "/assets/user/user14.jpg", course: "BBA" },
    { name: "Kiara Verma", img: "/assets/user/user15.jpg", course: "B.Sc Physics" },
    { name: "Nandini Gupta", img: "/assets/user/user16.jpg", course: "BA English" },
    { name: "Riya Kapoor", img: "/assets/user/user17.jpg", course: "B.Com" },
    { name: "Sanya Jain", img: "/assets/user/user18.jpg", course: "BCA" },
    { name: "Tanvi Reddy", img: "/assets/user/user19.jpg", course: "B.Sc Mathematics" },
    { name: "Vanshika Singh", img: "/assets/user/user20.jpg", course: "B.Tech IT" },
  ];

  const photos = members.map((member) => member.img);

  const handleNext = () => setSelectedIndex((prev) => (prev + 1) % photos.length);
  const handlePrev = () => setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
  const closeLightbox = () => setSelectedIndex(null);

  const handleAddFriend = (user) => {
    setAddedFriends((prev) =>
      prev.includes(user.name) ? prev.filter((name) => name !== user.name) : [...prev, user.name]
    );
  };

  return (
    <>
      {/* Total members count */}
      <p className="mb-4 font-semibold text-gray-700">
        Total Members: {members.length}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {members.map((member, idx) => (
          <div key={member.name} onClick={() => setSelectedIndex(idx)}>
            <UserCard2
              user={member}
              onAddFriend={handleAddFriend}
              isAdded={addedFriends.includes(member.name)}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            photos={photos}
            selectedIndex={selectedIndex}
            onNext={handleNext}
            onPrev={handlePrev}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MembersTab;
