import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [tasks, setTasks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                const token = localStorage.getItem("token");

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

        fetchUser();
    }, [navigate]);

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        async function fetchTask() {

            try {
                const token = localStorage.getItem("token");

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

            console.log(response.data);

            setTitle("");
            setDescription("");
            setIsCompleted(false);

        } catch (error) {
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
            <div className="mt-8">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="border border-gray-600 rounded-lg p-4 mb-4"
                    >
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>
                            {task.is_completed ? "Completed" : "Pending"}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Dashboard;