import React from "react";
import { MessageSquare, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: "Personal", icon: MessageSquare },
    { name: "Batch", icon: Users },
    { name: "Club", icon: BookOpen },
  ];

  return (
    <div className="relative flex justify-around bg-white mt-2 shadow-sm p-1 rounded-xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.name;

        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer focus:outline-none"
          >
            {/* Active background */}
            {isActive && (
              <motion.div
                layoutId="tabActive"
                className="absolute inset-0 bg-[#097abe] rounded-full shadow-md"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            {/* Icon + Label */}
            <motion.div
              className="flex items-center gap-2 relative z-10"
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
              <span className={`font-medium text-sm ${isActive ? "text-white" : "text-gray-700"}`}>
                {tab.name}
              </span>
            </motion.div>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
