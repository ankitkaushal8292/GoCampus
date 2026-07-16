const DashboardCard = ({
  title,
  value,
  icon,
  color = "bg-blue-500",
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-gray-500 text-sm font-medium">
            {title}
          </h3>

          <p className="mt-2 text-3xl font-bold text-gray-800">
            {value}
          </p>
        </div>

        <div
          className={`${color} w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default DashboardCard;