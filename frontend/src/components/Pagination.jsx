function Pagination({ page, totalPages, setPage }) {
    return (
        <div className="flex items-center justify-between mt-8">
            <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-600 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                Previous
            </button>

            <span>
                Page {page} of {totalPages}
            </span>

            <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-blue-600 rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;