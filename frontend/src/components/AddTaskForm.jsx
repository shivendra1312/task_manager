import { CalendarDays, Plus } from "lucide-react";

function AddTaskForm({ title, setTitle, description, setDescription, taskPriority, setTaskPriority, dueDate, setDueDate, handleAddTask, isLoading }) {
    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20 sm:p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-white">Create a task</h2>
                    <p className="mt-1 text-sm text-slate-400">Capture what needs your attention next.</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                    <Plus className="size-5" aria-hidden="true" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <label htmlFor="task-title" className="mb-2 block text-sm font-medium text-slate-200">Title</label>
                    <input id="task-title" type="text" placeholder="What needs to be done?" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                </div>
                <div className="lg:col-span-7">
                    <label htmlFor="task-description" className="mb-2 block text-sm font-medium text-slate-200">Description <span className="font-normal text-slate-500">(optional)</span></label>
                    <input id="task-description" type="text" placeholder="Add context, notes, or next steps" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
                </div>
                <div className="lg:col-span-3">
                    <label htmlFor="task-priority" className="mb-2 block text-sm font-medium text-slate-200">Priority</label>
                    <select id="task-priority" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-white transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30">
                        <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                    </select>
                </div>
                <div className="lg:col-span-4">
                    <label htmlFor="task-due-date" className="mb-2 block text-sm font-medium text-slate-200">Due date <span className="font-normal text-slate-500">(optional)</span></label>
                    <div className="relative"> <input
        id="task-due-date"
        type="date"
        value={dueDate}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDueDate(e.target.value)}
        className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-4
            py-3
            text-sm
            text-white
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/30
        "
    /></div>
                </div>
                <div className="flex items-end lg:col-span-5">
                    <button onClick={handleAddTask} disabled={isLoading} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60">
                        <Plus className="size-4" aria-hidden="true" />{isLoading ? "Adding task..." : "Add task"}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default AddTaskForm;
