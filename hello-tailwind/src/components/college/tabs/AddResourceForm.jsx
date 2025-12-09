// AddResourceForm.jsx
import React from "react";
import { motion } from "framer-motion";

// Temporary fixed user
const FIXED_USER = {
  name: "Rubia Khan",
  img: "/assets/user/user7.jpg",
};

const AddResourceForm = ({ showForm, newResource, setNewResource, handleSave, handleCancel }) => {
  if (!showForm) return null;

  // Attach fixed user whenever file/title is updated
  const handleChange = (field, value) => {
    setNewResource({ ...newResource, [field]: value, user: FIXED_USER });
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-40"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-24 right-6 w-80 p-5 border rounded-2xl shadow-xl bg-white z-50 flex flex-col gap-3"
      >
        <h2 className="font-semibold text-[#097abe] text-lg">Add Resource</h2>
        <input
          type="text"
          placeholder="Title"
          value={newResource.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#097abe]"
        />
        <textarea
          placeholder="Description (optional)"
          value={newResource.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#097abe] resize-none min-h-[60px]"
        />
        <label className="flex items-center gap-2 cursor-pointer text-[#097abe] hover:text-[#065c91] text-sm">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => handleChange("file", e.target.files[0])}
            className="hidden"
          />
          <span className="font-medium">{newResource.file ? newResource.file.name : "Select File"}</span>
        </label>

        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={handleCancel}
            className="px-3 py-1.5 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-[#097abe] text-white rounded-lg hover:bg-[#065c91] transition"
          >
            Save
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default AddResourceForm;
