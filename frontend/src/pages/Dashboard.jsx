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

    const navigate = useNavigate();

    async function fetchTask() {

        try {


            const response = await api.get("/tasks/all_tasks");

            setTasks(response.data.data);

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


        fetchTask()
    }, [])

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
            is_completed: isCompleted,
        });

        setTitle("");
        setDescription("");
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

    const filteredTasks = tasks.filter((task) => {

        const matchesSearch =
            task.title.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filter === "all"
                ? true
                : filter === "completed"
                    ? task.is_completed
                    : !task.is_completed;

        return matchesSearch && matchesFilter;
    });
    const totalTasks = tasks.length;

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
                handleAddTask={handleAddTask}
                isLoading={isLoading}
            />
            <SearchFilter
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
            />
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
                {

                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            setEditingTask={setEditingTask}
                            handleToggleComplete={handleToggleComplete}
                            setEditingTask={setEditingTask}
                            
                        />
                    ))}
            </div>{
                tasks.length === 0 ? (
                    <EmptyState
                        title="No Tasks Yet"
                        message="Create your first task to get started."
                    />
                ) : filteredTasks.length === 0 ? (
                    <EmptyState
                        title="No Matching Tasks"
                        message="Try a different search or filter."
                    />
                ) : (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredTasks.map((task) => (
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