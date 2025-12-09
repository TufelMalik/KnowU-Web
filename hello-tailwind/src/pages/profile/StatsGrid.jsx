import React from "react";

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6 p-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center cursor-pointer group transition-all duration-200 hover:scale-110"
        >
          <p className="font-bold text-2xl text-gray-900 group-hover:text-[#097abe] transition-colors">
            {stat.value}
          </p>
          <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
