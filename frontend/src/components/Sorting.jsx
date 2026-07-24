function Sorting({
    sortBy,
    setSortBy,
    order,
    setOrder,
}) {
    return (
        <div className="flex gap-4 mt-6">
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
            >
                <option value="id">Newest</option>
                <option value="title">Title</option>
                <option value="due_date">Due Date</option>
                <option value="is_completed">Status</option>
                <option value="priority">Priority</option>
            </select>

            <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
            >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
            </select>
        </div>
    );
}

export default Sorting;