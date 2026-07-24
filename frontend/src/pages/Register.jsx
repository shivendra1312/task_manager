import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        hash_password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (formData.hash_password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/user/create_account", {
                name: formData.name,
                username: formData.username,
                email: formData.email,
                hash_password: formData.hash_password,
            });

            toast.success("Account created successfully!");

            navigate("/login");
        } catch (err) {
            const message =
                err.response?.data?.detail || "Registration failed.";

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800">

                <h1 className="text-3xl font-bold text-white text-center">
                    Create Account
                </h1>

                <p className="text-gray-400 text-center mt-2">
                    Create your Task Manager account
                </p>

                {error && (
                    <div className="mt-4 bg-red-500/20 text-red-400 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 mt-6">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500"
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500"
                    />

                    <input
                        type="password"
                        name="hash_password"
                        placeholder="Password"
                        value={formData.hash_password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg text-white font-semibold disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-400 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;