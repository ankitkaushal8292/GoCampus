import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navigation */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;