import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import EditTaskModal from "../components/EditTaskModal";
import toast from "react-hot-toast";
import TaskCard from "../components/TaskCard";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");

    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState("all");

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
        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/tasks/create",
                {
                    title,
                    description,
                    is_completed: isCompleted,
                }
            );



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

    return (
        <div className="min-h-screen bg-slate-900 text-white p-10">
            <h1 className="text-3xl font-bold">Dashboard</h1>


            <h2>Name: {user.name}</h2>
            <h2>Username: {user.username}</h2>
            <h2>Email: {user.email}</h2>

            <button onClick={handleLogout}>
                Logout
            </button>

            <div className="mt-5 flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button onClick={handleAddTask}>
                    Add Task
                </button>


            </div>
            <div className=" flex">
                <input
                    type="text"
                    placeholder="Search Task..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-3 m-5 rounded-lg bg-slate-800 border border-gray-700 text-white"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-slate-800 text-white border m-5 border-gray-700 rounded-lg px-3 py-2"
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            <div className="mt-8">
                {filteredTasks.map((task) => (
                    <TaskCard
        key={task.id}
        task={task}
        handleDeleteTask={handleDeleteTask}
        handleToggleComplete={handleToggleComplete}
        setEditingTask={setEditingTask}
    />
                ))}
            </div>
            {editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    fetchTask={fetchTask}
                />
            )}        </div>
    );
}

export default Dashboard;