import {
  FaCarSide,
  FaShieldAlt,
  FaMoneyBillWave,
  FaBolt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaCarSide className="text-4xl text-blue-600" />,
    title: "Ride Sharing",
    description:
      "Find and share rides with students from your college.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-green-600" />,
    title: "Safe Travel",
    description:
      "Travel only with verified students using secure accounts.",
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-yellow-500" />,
    title: "Affordable",
    description:
      "Split fuel costs and save money on every trip.",
  },
  {
    icon: <FaBolt className="text-4xl text-purple-600" />,
    title: "Easy Booking",
    description:
      "Book or create rides in just a few clicks.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose GoCampus?
          </h2>

          <p className="text-gray-500 mt-4">
            Everything you need for safe and affordable campus travel.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;