
function Navbar({ user, handleLogout }) {
    return (
        <nav className="bg-slate-800 shadow-lg rounded-xl px-8 py-4 flex justify-between items-center">
            
            <div>
                <h1 className="text-2xl font-bold text-blue-400">
                    TaskManager
                </h1>
                <p className="text-sm text-gray-400">
                    Stay Organized
                </p>
            </div>

            
            <div className="flex items-center gap-6">
                <div className="text-right">
                    <h2 className="font-semibold">
                        {user.name}
                    </h2>

                    <p className="text-sm text-gray-400">
                        {user.email}
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;