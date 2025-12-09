import React, { useState } from "react";
import ResourceCard from "./ResourceCard";
import AddResourceButton from "./AddResourceButton";
import AddResourceForm from "./AddResourceForm";
import { Search, X } from "lucide-react";

const Resource = () => {
  const [resources, setResources] = useState([
    {
      title: "Physics",
      description: "Fundamentals and important notes.",
      category: "PDF",
      link: "/assets/docs/physics.pdf",
      user: { name: "Aditi Sharma", img: "/assets/user/user8.jpg" },
    },
    {
      title: "Chemistry",
      description: "Organic and inorganic concepts.",
      category: "PDF",
      link: "/assets/docs/chemistry.pdf",
      user: { name: "Rahul Sharma", img: "/assets/user/user2.jpg" },
    },
    {
      title: "Mathematics",
      description: "Algebra, Calculus, and more.",
      category: "PDF",
      link: "/assets/docs/mathematics.pdf",
      user: { name: "Ananya Singh", img: "/assets/user/user3.jpg" },
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    file: null,
    user: { name: "Roma Sharma", img: "/assets/user/user6.jpg" },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSaveResource = () => {
    if (!newResource.title || !newResource.file) {
      alert("Please provide a title and select a file.");
      return;
    }

    const newRes = {
      title: newResource.title,
      description: newResource.description || "",
      category: newResource.file.name.split(".").pop().toUpperCase(),
      link: URL.createObjectURL(newResource.file),
      user: newResource.user,
    };

    setResources((prev) => [newRes, ...prev]);
    handleCancel();
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewResource({
      title: "",
      description: "",
      file: null,
      user: { name: "Aditi Sharma", img: "/assets/user/user5.jpg" },
    });
  };

  // Filter resources by title
  const filteredResources = resources.filter((res) =>
    res.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
            isFocused ? "text-[#097abe]" : "text-gray-400"
          }`}
          size={20}
        />
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-300 shadow-sm focus:border-[#097abe] focus:ring-2 focus:ring-[#097abe]/30 placeholder-gray-400 outline-none transition-all duration-200"
        />
        {searchTerm && (
          <X
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-[#097abe] transition-colors"
            onClick={() => setSearchTerm("")}
          />
        )}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((res, idx) => (
          <ResourceCard key={idx} res={res} />
        ))}
      </div>

      <AddResourceButton onClick={() => setShowForm(true)} />

      <AddResourceForm
        showForm={showForm}
        newResource={newResource}
        setNewResource={setNewResource}
        handleSave={handleSaveResource}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default Resource;
