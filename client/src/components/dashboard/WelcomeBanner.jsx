import { useAuth } from "../../context/AuthContext";

const WelcomeBanner = () => {
  const { user } = useAuth();

  return (
    <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">

      <h1 className="text-3xl font-bold">
        Welcome back, {user?.name}! 👋
      </h1>

      <p className="mt-3 text-blue-100">
        Find your ride, save money, and travel safely with your campus friends.
      </p>

    </div>
  );
};

export default WelcomeBanner;