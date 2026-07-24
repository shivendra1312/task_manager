function AddTaskForm({
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    handleAddTask,
    isLoading,

}) {
    return (
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg mt-8">
            <h2 className="text-2xl font-bold text-white mb-5">
                Add New Task
            </h2>

            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Enter task title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                    placeholder="Enter task description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                        Priority
                    </label>

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="low">🟢 Low</option>
                        <option value="medium">🟡 Medium</option>
                        <option value="high">🔴 High</option>
                    </select>
                </div>
                <div>
    <label className="block text-gray-300 mb-2 font-medium">
        Due Date
    </label>

    <input
        type="date"
        value={dueDate}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
</div>
                <button
                    onClick={handleAddTask}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition"
                >
                    {isLoading ? "Adding..." : "Add Task"}
                </button>

            </div>
        </div>
    );
}

export default AddTaskForm;