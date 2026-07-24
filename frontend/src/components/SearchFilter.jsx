import { Search } from "lucide-react";

function SearchFilter({ search, setSearch, filter, setFilter, priority, setPriority }) {
    const controlClass = "w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-3 text-sm text-slate-100 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:col-span-3">
            <label className="relative sm:col-span-3 xl:col-span-1">
                <span className="sr-only">Search tasks</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
                <input type="search" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} className={`${controlClass} pl-10`} />
            </label>
            <label>
                <span className="mb-1.5 block text-xs font-medium text-slate-400">Status</span>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className={controlClass}>
                    <option value="all">All tasks</option><option value="completed">Completed</option><option value="pending">Pending</option>
                </select>
            </label>
            <label>
                <span className="mb-1.5 block text-xs font-medium text-slate-400">Priority</span>
                <select value={priority} onChange={(e) => setPriority(e.target.value)} className={controlClass}>
                    <option value="all">All priorities</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
                </select>
            </label>
        </div>
    );
}

export default SearchFilter;
