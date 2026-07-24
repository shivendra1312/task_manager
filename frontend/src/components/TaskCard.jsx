import { CalendarDays, CheckCircle2, Clock3, Pencil, Trash2 } from "lucide-react";

function TaskCard({ task, setDeleteTask, handleToggleComplete, setEditingTask }) {
    const priorityStyles = {
        high: "border-red-500/25 bg-red-500/10 text-red-300",
        medium: "border-amber-500/25 bg-amber-500/10 text-amber-300",
        low: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
    };
    const formattedDate = task.due_date ? new Date(task.due_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let daysLeft = null;
    if (task.due_date) {
        const due = new Date(task.due_date);
        due.setHours(0, 0, 0, 0);
        daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    }
    const dueLabel = daysLeft === null ? null : daysLeft > 0 ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} left` : daysLeft === 0 ? "Due today" : `${Math.abs(daysLeft)} day${Math.abs(daysLeft) === 1 ? "" : "s"} overdue`;
    const dueColor = daysLeft === null ? "" : daysLeft < 0 ? "text-red-300" : daysLeft === 0 ? "text-amber-300" : "text-emerald-300";
    const checkboxId = `task-completion-${task.id}`;

    return (
        <article className="group flex min-h-72 flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-slate-950/30">
            <div className="flex items-start justify-between gap-3">
                <span className={`rounded-lg border px-2.5 py-1 text-xs font-semibold capitalize ${priorityStyles[task.priority] || priorityStyles.medium}`}>{task.priority}</span>
                <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${task.is_completed ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300"}`}>{task.is_completed ? "Completed" : "Pending"}</span>
            </div>
            <div className="mt-5">
                <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-white">{task.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{task.description || "No description added."}</p>
            </div>
            <div className="mt-5 space-y-2 border-t border-slate-800 pt-4 text-sm">
                {formattedDate ? <div className="flex items-center gap-2 text-slate-300"><CalendarDays className="size-4 text-slate-500" aria-hidden="true" /><span>Due {formattedDate}</span></div> : <div className="flex items-center gap-2 text-slate-500"><CalendarDays className="size-4" aria-hidden="true" /><span>No due date</span></div>}
                {dueLabel && <div className={`flex items-center gap-2 ${dueColor}`}><Clock3 className="size-4" aria-hidden="true" /><span>{dueLabel}</span></div>}
            </div>
            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <label htmlFor={checkboxId} className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-300">
                    <input id={checkboxId} type="checkbox" checked={task.is_completed} onChange={() => handleToggleComplete(task)} className="sr-only peer" />
                    <span className="flex size-5 items-center justify-center rounded-md border border-slate-600 bg-slate-950 text-transparent transition peer-checked:border-emerald-500 peer-checked:bg-emerald-500 peer-checked:text-white"><CheckCircle2 className="size-3.5" aria-hidden="true" /></span>
                    {task.is_completed ? "Complete" : "Mark complete"}
                </label>
                <div className="flex items-center gap-1">
                    <button onClick={() => setEditingTask(task)} className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/60" aria-label={`Edit ${task.title}`}><Pencil className="size-4" aria-hidden="true" /></button>
                    <button onClick={() => setDeleteTask(task)} className="rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/60" aria-label={`Delete ${task.title}`}><Trash2 className="size-4" aria-hidden="true" /></button>
                </div>
            </div>
        </article>
    );
}

export default TaskCard;
