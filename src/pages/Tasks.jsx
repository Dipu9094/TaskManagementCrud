import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState(""); // For search functionality
  const location = useLocation();
  const message = location.state?.message || "";

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  // 🔥 Delete task by ID
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // 🔎 Filter tasks based on search input
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>

      {/* ✅ Show message if redirected from Add/Edit */}
      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded">
          {message}
        </div>
      )}

      {/* 🔎 Search Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* 🧱 Task List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition duration-200 p-4 relative"
            >
              {/* 🔗 Navigate to Task Detail */}
              <Link to={`/tasks/${task.id}`} className="block">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {task.description}
                </p>
              </Link>

              {/* ✏️ Edit Button */}
              <Link
                to={`/tasks/${task.id}/edit`}
                className="absolute top-2 right-2 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </Link>

              {/* ❌ Delete Button */}
              <button
                onClick={() => handleDelete(task.id)}
                className="absolute bottom-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No tasks found.
          </p>
        )}
      </div>
    </div>
  );
}
