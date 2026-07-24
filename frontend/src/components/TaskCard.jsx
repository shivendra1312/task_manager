function TaskCard({
    task,
    setDeleteTask,
    handleToggleComplete,
    setEditingTask,
}) {

    const priorityColor = {
        high: "bg-red-500",
        medium: "bg-yellow-500",
        low: "bg-green-500",
    };
    const formattedDate = task.due_date
        ? new Date(task.due_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : null;

    const today = new Date();
today.setHours(0, 0, 0, 0);

const due = new Date(task.due_date);
due.setHours(0, 0, 0, 0);

const diff = due - today;

const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return (
        <div className="bg-slate-800 rounded-xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${priorityColor[task.priority]}`}
            >
                {task.priority.toUpperCase()}
            </span>

            {/* Header */}
            <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-white">
                    {task.title}
                </h2>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${task.is_completed
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                        }`}
                >
                    {task.is_completed ? "Completed" : "Pending"}
                </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 mt-3">
                {task.description}
            </p>
            {
                formattedDate && (
                    <div className="mt-3">
                        <p className="text-sm text-cyan-400">
                            📅 Due: {formattedDate}
                        </p>
                    </div>
                )
            }
            {
    daysLeft > 0 && (
        <p className="text-green-400">
            ⏳ {daysLeft} days left
        </p>
    )
}

{
    daysLeft === 0 && (
        <p className="text-yellow-400">
            📅 Due Today
        </p>
    )
}

{
    daysLeft < 0 && (
        <p className="text-red-400">
            ❌ Overdue by {Math.abs(daysLeft)} days
        </p>
    )
}
            {/* Status */}
            <div className="flex items-center gap-3 mt-5">
                <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => handleToggleComplete(task)}
                    className="w-5 h-5 accent-green-500 cursor-pointer"
                />

                <span className="text-gray-300">
                    Mark as {task.is_completed ? "Pending" : "Completed"}
                </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
                <button
                    onClick={() => setEditingTask(task)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                    Edit
                </button>

                <button
                    onClick={() => setDeleteTask(task)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskCard;