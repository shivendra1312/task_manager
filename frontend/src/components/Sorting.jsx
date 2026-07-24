import { ArrowDownUp } from "lucide-react";

function Sorting({ sortBy, setSortBy, order, setOrder }) {
    const controlClass = "w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-3 text-sm text-slate-100 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:col-span-2">
            <label>
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-400"><ArrowDownUp className="size-3.5" aria-hidden="true" />Sort by</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={controlClass}>
                    <option value="id">Newest</option><option value="title">Title</option><option value="due_date">Due date</option><option value="is_completed">Status</option><option value="priority">Priority</option>
                </select>
            </label>
            <label>
                <span className="mb-1.5 block text-xs font-medium text-slate-400">Order</span>
                <select value={order} onChange={(e) => setOrder(e.target.value)} className={controlClass}>
                    <option value="desc">Descending</option><option value="asc">Ascending</option>
                </select>
            </label>
        </div>
    );
}

export default Sorting;
