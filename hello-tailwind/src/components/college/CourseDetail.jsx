import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, Check } from "lucide-react";

const batches = {
  "Batch 1": [
    { name: "Module 1: Introduction", img: "/assets/courses/aids.jpg" },
  ],
  "Batch 2": [
    { name: "Module 3: Advanced Topics", img: "/assets/courses/ar.jpg" },
  ],
};

const CourseDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [addedModules, setAddedModules] = useState([]);

  const department = decodeURIComponent(params.department);
  const year = decodeURIComponent(params.year);
  const course = decodeURIComponent(params.course);

  const toggleModule = (moduleName) => {
    setAddedModules((prev) =>
      prev.includes(moduleName)
        ? prev.filter((m) => m !== moduleName)
        : [...prev, moduleName]
    );
  };

  // Navigate to batch route
  const handleBatchClick = (batchName) => {
    const encodedBatch = encodeURIComponent(batchName);
    navigate(`/college/${department}/${year}/${course}/${encodedBatch}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Course Info */}
      <h1 className="text-3xl font-bold mb-4">{course}</h1>
      <p className="text-gray-700 mb-2">
        Department: <span className="font-semibold">{department}</span>
      </p>
      <p className="text-gray-700 mb-6">
        Year: <span className="font-semibold">{year}</span>
      </p>

      {/* Batches */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(batches).map(([batchName, modules]) =>
          modules.map((module) => (
            <div
              key={module.name}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => handleBatchClick(batchName)} // ✅ navigate on click
            >
              {/* Image */}
              <img
                src={module.img}
                alt={module.name}
                className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    module.name
                  )}&size=400&background=097abe&color=fff`;
                }}
              />

              {/* Add / Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleModule(module.name);
                }}
                className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110 ${
                  addedModules.includes(module.name)
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-[#097abe] hover:bg-[#065a94]"
                } text-white`}
              >
                {addedModules.includes(module.name) ? (
                  <Check size={18} />
                ) : (
                  <UserPlus size={18} />
                )}
              </button>

              {/* Blurry Bottom Overlay (Batch Name) */}
              <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-md text-center py-2">
                <p className="font-semibold text-sm text-gray-900 truncate">
                  {batchName}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
