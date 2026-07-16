import {
  FaUserPlus,
  FaSearch,
  FaCarSide,
  FaMapMarkerAlt,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-5xl text-blue-600" />,
    title: "Create Account",
    description: "Register as a Student or Driver using your college email.",
  },
  {
    icon: <FaSearch className="text-5xl text-green-600" />,
    title: "Find a Ride",
    description: "Search for available rides or publish your own ride.",
  },
  {
    icon: <FaCarSide className="text-5xl text-yellow-500" />,
    title: "Book Your Ride",
    description: "Join the ride and connect with your ride partner.",
  },
  {
    icon: <FaMapMarkerAlt className="text-5xl text-red-500" />,
    title: "Travel Safely",
    description: "Enjoy a safe, affordable and eco-friendly journey.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            How It Works
          </h2>

          <p className="text-gray-500 mt-3">
            Start sharing rides in just four simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-xl border hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-5">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;