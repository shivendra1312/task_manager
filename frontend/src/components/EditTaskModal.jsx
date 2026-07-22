import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function EditTaskModal({ task, onClose, fetchTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setIsCompleted(task.is_completed);
        }
    }, [task]);

    async function handleUpdateTask() {
        try {
            await api.put(`/tasks/update_task/${task.id}`, {
                title,
                description,
                is_completed: isCompleted,
            });

            await fetchTask();

            toast.success("Task Updated Successfully");
            onClose();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <div className="bg-gray-800 rounded-xl p-6 w-[500px]">

                <h2 className="text-2xl font-bold mb-4">
                    Edit Task
                </h2>

                <input
                    className="w-full border p-2 rounded mb-3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="w-full border p-2 rounded mb-3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label className="flex gap-2 mb-5">
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.checked)}
                    />
                    Completed
                </label>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdateTask}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EditTaskModal;