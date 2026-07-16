import { FaUserCircle } from "react-icons/fa";
import NotificationDropdown from "./NotificationDropdown";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8">

      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.name || "Student"} 👋
        </h2>

        <p className="text-gray-500">
          Have a safe journey with GoCampus
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        <NotificationDropdown />

        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="text-4xl text-blue-600" />

          <div>
            <h3 className="font-semibold">
              {user?.name}
            </h3>

            <p className="text-sm text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Topbar;