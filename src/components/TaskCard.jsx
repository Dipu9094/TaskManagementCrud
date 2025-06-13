export default function TaskCard({ task }) {
  return (
    <div className="bg-white shadow p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <p className="text-sm text-gray-400">Created at: {task.createdAt}</p>
    </div>
  );
}
