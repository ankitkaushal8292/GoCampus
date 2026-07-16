import api from "../api/axios";

// Get Notifications
export const getNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

// Mark as Read
export const markAsRead = async (id) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data;
};

// Delete Notification
export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};