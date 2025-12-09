import React, { useState } from "react";
import { Cpu, Wrench, Briefcase, UserCheck, PlusCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DepartmentCard = ({ department }) => {
  const [joined, setJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const departmentMap = {
    USAR: { icon: <Cpu className="w-10 h-10 text-blue-500" /> },
    USMC: { icon: <Briefcase className="w-10 h-10 text-pink-500" /> },
    USAP: { icon: <Wrench className="w-10 h-10 text-orange-500" /> },
    USDI: { icon: <Cpu className="w-10 h-10 text-purple-500" /> },
  };

  const info = departmentMap[department.name] || {
    icon: <Cpu className="w-10 h-10 text-gray-400" />,
  };

  const handleJoin = (e) => {
    e.stopPropagation(); // prevent triggering card click
    if (!joined && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setJoined(true);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div
      onClick={() => navigate(`/college/${department.name}`)}
      className="w-full group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative w-full h-48 sm:h-52">
        <img
          src={department.image}
          alt={department.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              department.name
            )}&size=400&background=097abe&color=fff`;
          }}
        />

        <button
          onClick={handleJoin}
          disabled={joined || isLoading}
          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            joined
              ? "bg-green-500 hover:bg-green-600"
              : isLoading
              ? "bg-blue-400 animate-pulse"
              : "bg-[#097abe] hover:bg-[#065a94]"
          } text-white`}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : joined ? (
            <UserCheck size={18} />
          ) : (
            <PlusCircle size={18} />
          )}
        </button>
      </div>

      <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-sm text-center py-1.5">
        <div className="flex flex-col items-center justify-center gap-1">
          {info.icon}
          <p className="font-semibold text-sm text-gray-900 truncate">{department.name}</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
