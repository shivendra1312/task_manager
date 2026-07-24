function DashboardHeader({ user }) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    return (
        <section className="mb-8 pt-2 sm:mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">Workspace overview</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span aria-hidden="true">👋 </span>{greeting}, {user.name}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                Stay productive and manage your tasks efficiently.
            </p>
        </section>
    );
}

export default DashboardHeader;
