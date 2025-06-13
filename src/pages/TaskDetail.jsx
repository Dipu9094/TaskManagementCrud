import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const found = tasks.find((t) => t.id === id);
    if (!found) {
      navigate("/tasks", { state: { message: "Task not found!" } });
    } else {
      setTask(found);
    }
  }, [id, navigate]);

  if (!task) return null;

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Task Detail</h2>
      <p className="text-lg mb-2">
        <strong>Title:</strong> {task.title}
      </p>
      <p className="text-md mb-6 text-gray-700">
        <strong>Description:</strong> {task.description}
      </p>
      <Link
        to={`/tasks/${task.id}/edit`}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Edit Task
      </Link>
    </div>
  );
}
