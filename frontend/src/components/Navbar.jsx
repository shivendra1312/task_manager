import { CheckSquare2, LogOut } from "lucide-react";

function Navbar({ user, handleLogout }) {
    const initials = (user?.name || user?.email || "U")
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/90 bg-slate-950/80 backdrop-blur-xl">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                        <CheckSquare2 className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold tracking-tight text-white sm:text-base">TaskManager</h1>
                        <p className="text-xs text-slate-400">Your work, in focus</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-medium text-slate-100">{user.name}</p>
                        <p className="max-w-44 truncate text-xs text-slate-400">{user.email}</p>
                    </div>
                    <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-xs font-bold text-white ring-2 ring-slate-800" aria-label={`${user.name}'s profile`}>
                        {initials}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 transition-all hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-950 sm:px-4"
                    >
                        <LogOut className="size-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
