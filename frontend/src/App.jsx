import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
function App() {
  return (
    <>
<Toaster
        position="top-right"
        reverseOrder={false}
      />
    <Routes>
      <Route path="/" element={<PublicRoute>
        <Login />
      </PublicRoute>} />
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>} />

        <Route
    path="/register"
    element={
      <PublicRoute>
        <Register />
      </PublicRoute>
    }
  />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}

export default App;