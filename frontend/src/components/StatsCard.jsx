function StatsCard({ title, value, icon, color }) {
    return (
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold text-white mt-2">
                        {value}
                    </h2>
                </div>

                <div className={`text-4xl ${color}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default StatsCard;