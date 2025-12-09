import React from "react";

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex justify-between border-b-2 border-gray-100">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            className={`flex items-center space-x-2 py-3 px-4 font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab.id
                ? "border-b-2 border-[#097abe] text-[#097abe] -mb-0.5"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={18} />
            <span className="text-sm">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
