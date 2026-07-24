import { ClipboardList } from "lucide-react";

function EmptyState({ title, message }) {
    return (
        <section className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20"><ClipboardList className="size-7" aria-hidden="true" /></div>
            <h2 className="mt-5 text-xl font-semibold text-white">{title}</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">{message}</p>
        </section>
    );
}

export default EmptyState;
