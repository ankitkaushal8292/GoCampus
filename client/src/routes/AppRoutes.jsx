import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/common/Home";
import StudentDashboard from "../pages/student/StudentDashboard";
import DriverDashboard from "../pages/driver/DriverDashboard";
import NotFound from "../pages/common/NotFound";
import CreateRide from "../pages/driver/CreateRide";
import ProtectedRoute from "./ProtectedRoute";
import MyRides from "../pages/driver/MyRides";
import SearchRide from "../pages/student/SearchRide";
import MyBookings from "../pages/student/MyBookings";
import DriverProfile from "../pages/driver/DriverProfile";
import StudentProfile from "../pages/student/StudentProfile";
import RideRequests from "../pages/driver/RideRequests";
import MyRequests from "../pages/student/MyRequests";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Student Dashboard */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/student/my-requests"
  element={
    <ProtectedRoute allowedRole="student">
      <MyRequests />
    </ProtectedRoute>
  }
/>
        <Route path="/driver/profile" element={<DriverProfile />} />

        <Route path="/student/profile" element={<StudentProfile />} />
        <Route
          path="/student/search"
          element={
            <ProtectedRoute allowedRole="student">
              <SearchRide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/bookings"
          element={
            <ProtectedRoute allowedRole="student">
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* Driver Dashboard */}
        <Route
          path="/driver/dashboard"
          element={
            <ProtectedRoute allowedRole="driver">
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/driver/my-rides" element={<MyRides />} />
        <Route
          path="/driver/create-ride"
          element={
            <ProtectedRoute allowedRole="driver">
              <CreateRide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/ride-requests"
          element={
            <ProtectedRoute allowedRole="driver">
              <RideRequests />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
