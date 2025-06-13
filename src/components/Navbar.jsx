import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear auth context
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* 🔷 Logo */}
        <Link to="/" className="text-xl font-bold">
          ProdMate
        </Link>

        {/* 🔗 Navigation Links */}
        <div className="space-x-4 flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline text-white" : "hover:underline"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? "underline text-white" : "hover:underline"
            }
          >
            Tasks
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink
                to="/add-task"
                className={({ isActive }) =>
                  isActive ? "underline text-white" : "hover:underline"
                }
              >
                Add Task
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "underline text-white" : "hover:underline"
                }
              >
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="ml-4 bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "underline text-white" : "hover:underline"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "underline text-white" : "hover:underline"
                }
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
