function TaskCard({
    task,
    handleDeleteTask,
    handleToggleComplete,
    setEditingTask,
}) {
    return (
        <div className="bg-slate-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition mb-5">
            <h2 className="text-xl font-bold text-white">
                {task.title}
            </h2>

            <p className="text-gray-400 mt-2">
                {task.description}
            </p>

            <div className="flex items-center gap-3 mt-4">
    <input
        type="checkbox"
        checked={task.is_completed}
        onChange={() => handleToggleComplete(task)}
        className="w-5 h-5 accent-green-500 cursor-pointer"
    />

    <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
            task.is_completed
                ? "bg-green-500/20 text-green-400"
                : "bg-yellow-500/20 text-yellow-400"
        }`}
    >
        {task.is_completed ? "Completed" : "Pending"}
    </span>
</div>
        </div>
    );
}


export default TaskCard;