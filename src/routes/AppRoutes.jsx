// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Tasks from "../pages/Tasks";
import TaskDetail from "../pages/TaskDetail";
import AddTask from "../pages/AddTask";
import EditTask from "../pages/EditTask";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute"; // ✅
import { useAuth } from "../context/AuthContext";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  const { user, loading } = useAuth(); // ✅ use loading + user

  // ✅ Show a spinner while checking login state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        {/* 👇 Wrap private routes */}
        <Route
          path="tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route
          path="tasks/:id"
          element={
            <PrivateRoute>
              <TaskDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="add-task"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
        <Route
          path="tasks/:id/edit"
          element={
            <PrivateRoute>
              <EditTask />
            </PrivateRoute>
          }
        />
        <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      </Route>
      

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
