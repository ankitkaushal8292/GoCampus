import { FaCamera } from "react-icons/fa";

const ProfileAvatar = ({
  image,
  name,
  onImageClick,
  loading = false,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative group">

        <img
          src={
            image ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              name || "User"
            )}&background=2563eb&color=fff&size=200`
          }
          alt="Profile"
          className="h-36 w-36 rounded-full border-4 border-blue-500 object-cover shadow-lg"
        />

        <button
          type="button"
          onClick={onImageClick}
          disabled={loading}
          className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "..." : <FaCamera />}
        </button>

      </div>

      <p className="mt-4 text-lg font-semibold text-gray-700">
        {name}
      </p>
    </div>
  );
};

export default ProfileAvatar;