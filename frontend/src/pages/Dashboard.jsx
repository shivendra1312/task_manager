import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import EditTaskModal from "../components/EditTaskModal";
import toast from "react-hot-toast";
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
            const response = await api.get("/tasks/all_tasks", {
                params: {
                    page,
                    limit,
                    search,
                    status: filter,
                    priority,
                    sort_by: sortBy,
                    order,

                },
            });

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
    useEffect(() => {


        fetchUser();
    }, [navigate]);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
    fetchTask();
}, [page, limit, search, filter, priority, sortBy, order]);

    async function handleAddTask() {

        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }



        setIsLoading(true);

        try {

            await api.post("/tasks/create", {
                title,
                description,
                priority: taskPriority,
                due_date: dueDate || null,
                is_completed: isCompleted,
            });

            setTitle("");
            setDescription("");
            setTaskPriority("medium");
            setDueDate(null);
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

    if (!user) {
        return <h1 className="text-white">Loading...</h1>;
    }
    async function handleToggleComplete(task) {
        try {
            await api.put(`/tasks/update_task/${task.id}`, {
                title: task.title,
                description: task.description,
                is_completed: !task.is_completed
            });

            await fetchTask();


            toast.success(
                !task.is_completed
                    ? "Task Completed 🎉"
                    : "Task Marked as Pending"
            );


        } catch (error) {
            toast.error("Failed to update task");
            console.log(error);
        }

    }




    const completedTasks = tasks.filter(
        (task) => task.is_completed
    ).length;

    const pendingTasks = tasks.filter(
        (task) => !task.is_completed
    ).length;

    return (
        <div className="min-h-screen bg-slate-900 text-white p-10">
            <Navbar
                user={user}
                handleLogout={handleLogout}
            />
            <DashboardHeader user={user} />

            <AddTaskForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                taskPriority={taskPriority}
                setTaskPriority={setTaskPriority}
                dueDate={dueDate}
                setDueDate={setDueDate}
                handleAddTask={handleAddTask}
                isLoading={isLoading}

            />
            <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <SearchFilter
    search={search}
    setSearch={setSearch}
    filter={filter}
    setFilter={setFilter}
    priority={priority}
    setPriority={setPriority}
/>

                <Sorting
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    order={order}
                    setOrder={setOrder}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <StatsCard
                    title="Total Tasks"
                    value={totalTasks}
                    icon="📋"
                    color="text-blue-400"
                />

                <StatsCard
                    title="Completed"
                    value={completedTasks}
                    icon="✅"
                    color="text-green-400"
                />

                <StatsCard
                    title="Pending"
                    value={pendingTasks}
                    icon="⏳"
                    color="text-yellow-400"
                />
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            </div>{
    tasks.length === 0 ? (
        <EmptyState
            title="No Tasks Yet"
            message="Create your first task to get started."
        />
    ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    setDeleteTask={setDeleteTask}
                    handleToggleComplete={handleToggleComplete}
                    setEditingTask={setEditingTask}
                />
            ))}
        </div>
    )
}

            <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
            />
            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    fetchTask={fetchTask}
                />
            )}
            {
                deleteTask && (
                    <DeleteConfirmationModal
                        task={deleteTask}
                        onClose={() => setDeleteTask(null)}
                        onDelete={handleDeleteTask}
                    />
                )
            }

        </div>
    );
}

export default Dashboard;
