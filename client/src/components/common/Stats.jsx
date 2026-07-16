const stats = [
  {
    number: "500+",
    title: "Students",
  },
  {
    number: "200+",
    title: "Daily Rides",
  },
  {
    number: "100+",
    title: "Verified Drivers",
  },
  {
    number: "98%",
    title: "Safe Trips",
  },
];

const Stats = () => {
  return (
    <section className="bg-blue-600 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((item, index) => (
            <div key={index}>
              <h2 className="text-5xl font-bold text-white">
                {item.number}
              </h2>

              <p className="text-blue-100 mt-3 text-lg">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;