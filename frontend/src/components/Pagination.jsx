import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ page, totalPages, setPage }) {
    const isFirstPage = page <= 1;
    const isLastPage = totalPages <= 1 || page >= totalPages;
    const buttonClass = "inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/60 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-700 disabled:hover:bg-slate-900";

    return (
        <nav className="mt-10 flex items-center justify-center gap-4" aria-label="Task pagination">
            <button onClick={() => setPage((previous) => previous - 1)} disabled={isFirstPage} className={buttonClass}><ChevronLeft className="size-4" aria-hidden="true" />Previous</button>
            <span className="min-w-24 text-center text-sm text-slate-400">Page <span className="font-semibold text-slate-100">{page}</span> of <span className="font-semibold text-slate-100">{Math.max(totalPages, 1)}</span></span>
            <button onClick={() => setPage((previous) => previous + 1)} disabled={isLastPage} className={buttonClass}>Next<ChevronRight className="size-4" aria-hidden="true" /></button>
        </nav>
    );
}

export default Pagination;
