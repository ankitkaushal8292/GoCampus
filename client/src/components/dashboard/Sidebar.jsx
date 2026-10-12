import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaHome,
  FaSearch,
  FaCar,
  FaUser,
  FaPlusCircle,
  FaClipboardList,
  FaSignOutAlt,
  FaInbox,
} from "react-icons/fa";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const menuClass =
    "mt-2 flex items-center gap-3 rounded-lg p-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition";

  const activeMenuClass =
    "mt-2 flex items-center gap-3 rounded-lg p-3 bg-blue-600 text-white";

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 overflow-hidden bg-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b">
        <h1 className="text-3xl font-bold text-blue-600">GoCampus</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-8 px-4">
        {/* ================= STUDENT MENU ================= */}
        {user?.role === "student" && (
          <>
            <NavLink
              to="/student/dashboard"
              className={({ isActive }) =>
                isActive ? activeMenuClass : menuClass
              }
            >
              <FaHome />
              Dashboard
            </NavLink>

            <NavLink
              to="/student/search"
              className={({ isActive }) =>
                isActive ? activeMenuClass : menuClass
              }
            >
              <FaSearch />
              Search Ride
            </NavLink>

            <NavLink
              to="/student/bookings"
              className={({ isActive }) =>
                isActive ? activeMenuClass : menuClass
              }
            >
              <FaClipboardList />
              My Bookings
            </NavLink>

            <NavLink
              to="/student/my-requests"
              className={({ isActive }) =>
                isActive ? activeMenuClass : menuClass
              }
            >
              <FaClipboardList />
              My Requests
            </NavLink>

            <NavLink
              to="/student/profile"
              className={({ isActive }) =>
                isActive ? activeMenuClass : menuClass
              }
            >
              <FaUser />
              Profile
            </NavLink>
          </>
        )}

        {/* ================= DRIVER MENU ================= */}
        {user?.role === "driver" && (
          <>
            <NavLink
              to="/driver/dashboard"
              className={({ isActive }) =>
                isActive ? activeMenuClass : menuClass
              }
            >
              <FaHome />
              Dashboard
            </NavLink>

            <NavLink
              to="/driver/create-ride"
              className={({ isActive }) =>
                isActive ? activeMenuClass : menuClass
              }
            >
              <FaPlusCircle />
              Create Ride
            </NavLink>

            <NavLink
              to="/driver/my-rides"
              className={({ isActive }) =>
                isActive ? activeMenuClass : menuClass
              }
            >
              <FaCar />
              My Rides
            </NavLink>

            <NavLink
              to="/driver/ride-requests"
              className={({ isActive }) =>
                isActive ? activeMenuClass : menuClass
              }
            >
              <FaInbox />
              Ride Requests
            </NavLink>
            <NavLink
              to="/driver/profile"
              className={({ isActive }) =>
                isActive ? activeMenuClass : menuClass
              }
            >
              <FaUser />
              Profile
            </NavLink>
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex cursor-pointer w-full items-center justify-center gap-3 rounded-lg bg-red-500 p-3 text-white hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
