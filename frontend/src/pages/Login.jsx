import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {

        try {
            const response = await api.post("/user/login", {
                username,
                password,
            });
            localStorage.setItem("token", response.data.token);

            navigate("/dashboard");
            const token = localStorage.getItem("token");

            const authResponse = await api.get("/user/is_auth", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            console.log(authResponse.data)
        } catch (error) {
            console.log(error.response.data)
        }

    }
   
    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-900">
            <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-96 ">
                <h1 className="text-3xl font-bold text-white mb-6" >Login</h1>

                <label className="block text-white mb-2">
                    Username
                </label>
                <input type="text" placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg p-3 mb-4 outline-none focus:border-blue-500" />


                <label className="block text-white mb-2">
                    Password
                </label>
                <input type="password" placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                    className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg p-3 mb-4 outline-none focus:border-blue-500" />


                <button type="button" onClick={handleLogin} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">Login</button>
            </div>
        </div>
    )
}

export default Login