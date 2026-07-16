import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaUserTag,
  FaEdit,
} from "react-icons/fa";

import ProfileAvatar from "./ProfileAvatar";

const ProfileCard = ({
  user,
  onEdit,
  onImageClick,
  imageUploading = false,
}) => {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg transition hover:shadow-2xl">
      <div className="grid gap-10 md:grid-cols-3">

        {/* Left Side */}
        <div className="flex justify-center">
          <ProfileAvatar
            image={user?.profileImage}
            name={user?.name}
            onImageClick={onImageClick}
            loading={imageUploading}
          />
        </div>

        {/* Right Side */}
        <div className="md:col-span-2">

          <h2 className="mb-8 text-3xl font-bold text-blue-600">
            My Profile
          </h2>

          <div className="grid gap-5">

            <div className="flex items-center gap-3">
              <FaUser className="text-blue-600" />
              <span className="font-medium">Name:</span>
              <span>{user?.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-green-600" />
              <span className="font-medium">Email:</span>
              <span>{user?.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="text-purple-600" />
              <span className="font-medium">Phone:</span>
              <span>{user?.phone || "Not Added"}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaUniversity className="text-orange-600" />
              <span className="font-medium">College:</span>
              <span>{user?.college || "Not Added"}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaUserTag className="text-red-600" />
              <span className="font-medium">Role:</span>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold capitalize text-blue-700">
                {user?.role}
              </span>
            </div>

          </div>

          <button
            onClick={onEdit}
            className="mt-10 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            <FaEdit />
            Edit Profile
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProfileCard;