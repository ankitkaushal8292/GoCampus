import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";

const Navbar = () => {
  const { openLogin, openRegister } = useModal();

  const handleHomeClick = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          onClick={handleHomeClick}
          className="text-3xl font-extrabold tracking-wide text-blue-600"
        >
          GoCampus
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">

          <Link
            to="/"
            onClick={handleHomeClick}
            className="font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Home
          </Link>

          <button
            onClick={openLogin}
            className="font-medium text-gray-700 transition-colors hover:text-blue-600 cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={openRegister}
            className="rounded-lg bg-blue-600 px-5 cursor-pointer py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Register
          </button>

        </nav>

      </div>
    </header>
  );
};

export default Navbar;