import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTask() {
  const { id } = useParams(); // get task id from URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Load the existing task
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      navigate("/tasks", { state: { message: "Task not found" } });
      return;
    }

    setTitle(task.title);
    setDescription(task.description);
  }, [id, navigate]);

  // Handle form submit
  const handleUpdate = (e) => {
    e.preventDefault();
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title, description } : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/tasks", { state: { message: "Task updated successfully!" } });
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Task</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded resize-none"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}
