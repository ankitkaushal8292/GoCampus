import { useModal } from "../../context/ModalContext";

const CTA = () => {
  const { openLogin, openRegister } = useModal();

  return (
    <section className="bg-gray-100 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <h2 className="text-4xl font-bold text-gray-800">
          Ready to Start Your Journey?
        </h2>

        <p className="mt-5 text-lg text-gray-600">
          Join GoCampus today and travel smarter, safer, and cheaper with your
          college friends.
        </p>

        <div className="mt-10 flex justify-center gap-5">

          <button
            onClick={openRegister}
            className="rounded-lg cursor-pointer bg-blue-600 px-7 py-3 text-white transition hover:bg-blue-700"
          >
            Create Account
          </button>

          <button
            onClick={openLogin}
            className="rounded-lg cursor-pointer border border-blue-600 px-7 py-3 text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            Login
          </button>

        </div>

      </div>
    </section>
  );
};

export default CTA;