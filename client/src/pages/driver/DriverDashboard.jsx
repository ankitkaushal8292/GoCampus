import { useEffect, useState } from "react";
import {
  FaCar,
  FaUsers,
  FaRoute,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
} from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { getDriverDashboard } from "../../services/rideService";
import toast from "react-hot-toast";

const DriverDashboard = () => {
  const [stats, setStats] = useState({
    totalRides: 0,
    activeRides: 0,
    completedRides: 0,
    cancelledRides: 0,
    totalPassengers: 0,
    pendingRequests: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDriverDashboard();

      if (response.success) {
        setStats({
          totalRides: response.totalRides,
          activeRides: response.activeRides,
          completedRides: response.completedRides,
          cancelledRides: response.cancelledRides,
          totalPassengers: response.totalPassengers,
          pendingRequests: response.pendingRequests,
        });
      }
    } catch (error) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-600">
            Loading Dashboard...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <WelcomeBanner />

      {/* Refresh Button */}

      <div className="mb-6 flex justify-end">
        <button
          onClick={fetchDashboard}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <FaSyncAlt />
          Refresh
        </button>
      </div>

      {/* Dashboard Cards */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <DashboardCard
          title="Total Rides"
          value={stats.totalRides}
          icon={<FaCar />}
          color="bg-blue-500"
        />

        <DashboardCard
          title="Passengers"
          value={stats.totalPassengers}
          icon={<FaUsers />}
          color="bg-green-500"
        />

        <DashboardCard
          title="Pending Requests"
          value={stats.pendingRequests}
          icon={<FaClipboardList />}
          color="bg-orange-500"
        />

        <DashboardCard
          title="Active Rides"
          value={stats.activeRides}
          icon={<FaRoute />}
          color="bg-purple-500"
        />

      </div>

      {/* Dashboard Summary */}

      <div className="mt-10 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-semibold">
          Dashboard Summary
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div className="rounded-xl border border-green-200 bg-green-50 p-5">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-3xl text-green-600" />

              <div>
                <h3 className="font-semibold text-green-700">
                  Completed Trips
                </h3>

                <p className="mt-2 text-3xl font-bold text-green-600">
                  {stats.completedRides}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-center gap-3">
              <FaTimesCircle className="text-3xl text-red-600" />

              <div>
                <h3 className="font-semibold text-red-700">
                  Cancelled Trips
                </h3>

                <p className="mt-2 text-3xl font-bold text-red-600">
                  {stats.cancelledRides}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="mt-8 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold">
          Recent Activity
        </h2>

        <div className="rounded-lg border border-dashed border-gray-300 py-10 text-center">

          <p className="text-gray-500">
            Recent activity will appear here.
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default DriverDashboard;