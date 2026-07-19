import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
function App() {
  return (

    <Routes>
      <Route path="/" element={<PublicRoute>
        <Login />
      </PublicRoute>} />
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;