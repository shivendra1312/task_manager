import { CheckCircle2, CircleDashed, ListTodo } from "lucide-react";

const cardStyles = {
    "Total Tasks": { Icon: ListTodo, accent: "bg-blue-500/10 text-blue-400 ring-blue-500/20", line: "bg-blue-500" },
    Completed: { Icon: CheckCircle2, accent: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20", line: "bg-emerald-500" },
    Pending: { Icon: CircleDashed, accent: "bg-amber-500/10 text-amber-400 ring-amber-500/20", line: "bg-amber-500" },
};

function StatsCard({ title, value }) {
    const { Icon, accent, line } = cardStyles[title] || cardStyles["Total Tasks"];

    return (
        <article className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-xl hover:shadow-slate-950/30 sm:p-6">
            <span className={`absolute inset-x-0 top-0 h-px ${line}`} aria-hidden="true" />
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-400">{title}</p>
                    <p className="mt-3 text-3xl font-bold tracking-tight text-white">{value}</p>
                </div>
                <div className={`flex size-11 items-center justify-center rounded-xl ring-1 ${accent}`}>
                    <Icon className="size-5" aria-hidden="true" />
                </div>
            </div>
        </article>
    );
}

export default StatsCard;
