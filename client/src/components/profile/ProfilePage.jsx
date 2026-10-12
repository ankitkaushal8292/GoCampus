import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaKey } from "react-icons/fa";

import ProfileCard from "./ProfileCard";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

import {
  getProfile,
  uploadProfileImage,
} from "../../services/userService";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fileInputRef = useRef(null);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      if (response.success) {
        setUser(response.user);
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB.");
      return;
    }

    try {
      setImageUploading(true);

      const response = await uploadProfileImage(file);

      if (response.success) {
        toast.success(response.message);
        await fetchProfile();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to upload profile image"
      );
    } finally {
      setImageUploading(false);
      e.target.value = "";
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-600">
          Loading Profile...
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-6xl">

        <ProfileCard
          user={user}
          onEdit={() => setShowEditModal(true)}
          onImageClick={() => fileInputRef.current.click()}
          imageUploading={imageUploading}
          onChangePassword={() => setShowPasswordModal(true)}
        />

        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={handleImageUpload}
        />

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
          >
            <FaKey />
            Change Password
          </button>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileForm
          user={user}
          onClose={() => setShowEditModal(false)}
          onProfileUpdated={(updatedUser) => {
            setUser(updatedUser);
            setShowEditModal(false);
          }}
        />
      )}

 
      {showPasswordModal && (
        <ChangePasswordForm
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </>
  );
};

export default ProfilePage;