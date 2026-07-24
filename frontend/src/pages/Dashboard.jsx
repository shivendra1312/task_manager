import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import EditTaskModal from "../components/EditTaskModal";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import StatsCard from "../components/StatsCard";
import AddTaskForm from "../components/AddTaskForm";
import SearchFilter from "../components/SearchFilter";
import EmptyState from "../components/EmptyState";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import Pagination from "../components/Pagination";
import Sorting from "../components/Sorting";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [deleteTask, setDeleteTask] = useState(null);
    const [taskPriority, setTaskPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalTasks, setTotalTasks] = useState(0);
    const [sortBy, setSortBy] = useState("id");
    const [order, setOrder] = useState("desc");
    const [priority, setPriority] = useState("all");
    const navigate = useNavigate();

    async function fetchTask() {
        try {
            const response = await api.get("/tasks/all_tasks", { params: { page, limit, search, status: filter, priority, sort_by: sortBy, order } });
            setTasks(response.data.data);
            setTotalPages(response.data.total_pages);
            setTotalTasks(response.data.total_tasks);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            console.log(error);
        }
    }

    async function fetchUser() {
        try {
            const response = await api.get("/user/is_auth");
            setUser(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            console.log(error);
        }
    }

    async function handleDeleteTask(taskId) {
        try {
            await api.delete(`/tasks/delete_task/${taskId}`);
            await fetchTask();
            setDeleteTask(null);
            toast.success("Task Deleted Successfully");
        } catch (error) {
            toast.error("Failed to delete task");
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            console.log(error);
        }
    }

    useEffect(() => { fetchUser(); }, [navigate]);
    useEffect(() => { fetchTask(); }, [page, limit, search, filter, priority, sortBy, order]);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    async function handleAddTask() {
        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }
        setIsLoading(true);
        try {
            await api.post("/tasks/create", { title, description, priority: taskPriority, due_date: dueDate || null, is_completed: isCompleted });
            setTitle("");
            setDescription("");
            setTaskPriority("medium");
            setDueDate("");
            setIsCompleted(false);
            await fetchTask();
            toast.success("Task Created Successfully");
        } catch (error) {
            toast.error("Failed to create task");
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleToggleComplete(task) {
        try {
            await api.put(`/tasks/update_task/${task.id}`, { title: task.title, description: task.description, is_completed: !task.is_completed });
            await fetchTask();
            toast.success(!task.is_completed ? "Task Completed 🎉" : "Task Marked as Pending");
        } catch (error) {
            toast.error("Failed to update task");
            console.log(error);
        }
    }

    if (!user) {
        return <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white"><div className="flex flex-col items-center gap-4" role="status" aria-live="polite"><span className="size-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" aria-hidden="true" /><p className="text-sm font-medium text-slate-400">Loading your workspace...</p></div></main>;
    }

    const completedTasks = tasks.filter((task) => task.is_completed).length;
    const pendingTasks = tasks.filter((task) => !task.is_completed).length;

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar user={user} handleLogout={handleLogout} />
            <main className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-8">
                <DashboardHeader user={user} />
                <div className="space-y-8">
                    <section aria-label="Task summary" className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
                        <StatsCard title="Total Tasks" value={totalTasks} />
                        <StatsCard title="Completed" value={completedTasks} />
                        <StatsCard title="Pending" value={pendingTasks} />
                    </section>

                    <AddTaskForm title={title} setTitle={setTitle} description={description} setDescription={setDescription} taskPriority={taskPriority} setTaskPriority={setTaskPriority} dueDate={dueDate} setDueDate={setDueDate} handleAddTask={handleAddTask} isLoading={isLoading} />

                    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm sm:p-5" aria-label="Task filters and sorting">
                        <div className="mb-4"><h2 className="text-base font-semibold text-white">Find tasks</h2><p className="mt-1 text-sm text-slate-400">Search, filter, and sort your work.</p></div>
                        <div className="grid grid-cols-1 gap-3 xl:grid-cols-5">
                            <SearchFilter search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} priority={priority} setPriority={setPriority} />
                            <Sorting sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder} />
                        </div>
                    </section>

                    <section aria-labelledby="task-list-heading">
                        <div className="mb-5"><h2 id="task-list-heading" className="text-xl font-semibold tracking-tight text-white">Your tasks</h2><p className="mt-1 text-sm text-slate-400">{totalTasks} task{totalTasks === 1 ? "" : "s"} in this view</p></div>
                        {tasks.length === 0 ? <EmptyState title="No tasks found" message="Try changing your filters or create a new task to get started." /> : <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{tasks.map((task) => <TaskCard key={task.id} task={task} setDeleteTask={setDeleteTask} handleToggleComplete={handleToggleComplete} setEditingTask={setEditingTask} />)}</div>}
                        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                    </section>
                </div>
            </main>
            {editingTask && <EditTaskModal task={editingTask} onClose={() => setEditingTask(null)} fetchTask={fetchTask} />}
            {deleteTask && <DeleteConfirmationModal task={deleteTask} onClose={() => setDeleteTask(null)} onDelete={handleDeleteTask} />}
        </div>
    );
}

export default Dashboard;
