function SearchFilter({
    search,
    setSearch,
    filter,
    setFilter,
    priority,
    setPriority,
}) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mt-8">
            <input
                type="text"
                placeholder="Search Task..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="all">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
        </div>
    );
}

export default SearchFilter;