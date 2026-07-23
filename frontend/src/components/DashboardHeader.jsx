function DashboardHeader({ user }) {
    const hour = new Date().getHours();

    let greeting = "Hello";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    return (
        <div className="mt-8 mb-8">
            <h1 className="text-4xl font-bold text-white">
                👋 {greeting}, {user.name}
            </h1>

            <p className="text-gray-400 mt-2 text-lg">
                Stay productive! Manage your tasks efficiently.
            </p>
        </div>
    );
}

export default DashboardHeader;