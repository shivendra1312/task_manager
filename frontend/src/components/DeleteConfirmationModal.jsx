function DeleteConfirmationModal({
    task,
    onClose,
    onDelete,
}) {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-slate-800 p-6 rounded-xl w-[400px]">

                <h2 className="text-2xl font-bold text-white">
                    Delete Task
                </h2>

                <p className="text-gray-300 mt-4">
                    Are you sure you want to delete
                    <span className="font-semibold text-red-400">
                        {" "}{task.title}
                    </span>
                    ?
                </p>

                <div className="flex justify-end gap-4 mt-6">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onDelete(task.id)}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
}

export default DeleteConfirmationModal;