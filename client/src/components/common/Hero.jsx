import { useModal } from "../../context/ModalContext";

const Hero = () => {
  const { openLogin, openRegister } = useModal();

  return (
    <section className="bg-blue-600 py-24 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 lg:flex-row">

        {/* Left */}

        <div className="flex-1">

          <h1 className="text-5xl font-bold leading-tight">
            Share Rides.
            <br />
            Save Money.
            <br />
            Travel Together.
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            GoCampus helps college students find and share rides safely with classmates.
          </p>

          <div className="mt-8 flex gap-4">

            <button
              onClick={openRegister}
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
            >
              Get Started
            </button>

            <button
              onClick={openLogin}
              className="rounded-lg border border-white px-6 py-3 transition hover:bg-white hover:text-blue-600"
            >
              Login
            </button>

          </div>

        </div>

        {/* Right */}

        <div className="mt-12 flex flex-1 justify-center lg:mt-0">

          <img
            src="https://illustrations.popsy.co/white/digital-nomad.svg"
            alt="Hero"
            className="w-[450px]"
          />

        </div>

      </div>
    </section>
  );
};

export default Hero;