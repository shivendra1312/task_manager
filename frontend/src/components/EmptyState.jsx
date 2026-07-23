function EmptyState({ title, message }) {
    return (
        <div className="mt-12 flex flex-col items-center justify-center text-center bg-slate-800 rounded-xl p-10 border border-slate-700">
            <div className="text-6xl mb-4">📋</div>

            <h2 className="text-2xl font-bold text-white">
                {title}
            </h2>

            <p className="text-gray-400 mt-2">
                {message}
            </p>
        </div>
    );
}

export default EmptyState;