import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      
      <p><strong>Name:</strong> {user?.name || "N/A"}</p>
      <p className="mt-2"><strong>Email:</strong> {user?.email || "N/A"}</p>

      <button
        onClick={logout}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
