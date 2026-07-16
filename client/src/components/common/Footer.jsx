const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">
            GoCampus
          </h2>

          <p className="mt-2">
            Safe Campus Ride Sharing Platform
          </p>
        </div>

        <div className="mt-6 md:mt-0">
          <p>© 2026 GoCampus. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;