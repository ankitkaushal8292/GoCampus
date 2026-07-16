import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBell,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../../services/notificationService";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();

      if (response.success) {
        setNotifications(response.notifications);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const handleRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter(
          (notification) => notification._id !== id
        )
      );

      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div className="relative">

      {/* Bell */}

      <button
        onClick={() =>
          setShowDropdown(!showDropdown)
        }
        className="relative text-2xl text-gray-600 hover:text-blue-600 transition"
      >
        <FaBell />

        {unreadCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}

      </button>

      {/* Dropdown */}

      {showDropdown && (
        <div className="absolute right-0 mt-4 w-96 rounded-2xl bg-white shadow-2xl border z-50">

          <div className="border-b p-4">

            <h2 className="text-lg font-bold">
              Notifications
            </h2>

          </div>

          <div className="max-h-96 overflow-y-auto">

            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No Notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`border-b p-4 transition ${
                    notification.isRead
                      ? "bg-white"
                      : "bg-blue-50"
                  }`}
                >

                  <div className="flex justify-between">

                    <div className="pr-3">

                      <h3 className="font-semibold">
                        {notification.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        {notification.message}
                      </p>

                    </div>

                    <div className="flex gap-2">

                      {!notification.isRead && (
                        <button
                          onClick={() =>
                            handleRead(
                              notification._id
                            )
                          }
                          className="text-green-600 hover:text-green-700"
                        >
                          <FaCheck />
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleDelete(
                            notification._id
                          )
                        }
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </div>

                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(
                      notification.createdAt
                    ).toLocaleString()}
                  </p>

                </div>
              ))
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default NotificationDropdown;