import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Save task to localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: uuid(),
      title,
      description,
    };

    const existing = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([newTask, ...existing]));

    // Redirect with a success message
    navigate("/tasks", { state: { message: "Task added successfully!" } });
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a New Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded outline-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded outline-blue-500 resize-none"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

      {/* Live preview */}
      {(title || description) && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
          <p className="text-gray-700">
            <strong>Title:</strong> {title || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> {description || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}
