import api from "../api/axios";

// ================= STUDENT DASHBOARD =================
export const getStudentDashboard = async () => {
  const response = await api.get("/users/student/dashboard");
  return response.data;
};

// ================= GET PROFILE =================
export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (userData) => {
  const response = await api.put("/users/profile", userData);
  return response.data;
};

// ================= CHANGE PASSWORD =================
export const changePassword = async (passwordData) => {
  const response = await api.put(
    "/users/change-password",
    passwordData
  );

  return response.data;
};

// ================= UPLOAD PROFILE IMAGE =================
export const uploadProfileImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await api.put(
    "/users/profile-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};