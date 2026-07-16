import MainLayout from "../../layouts/MainLayout";
import Hero from "../../components/common/Hero";
import Features from "../../components/common/Features";
import HowItWorks from "../../components/common/HowItWorks";
import Stats from "../../components/common/Stats";
import CTA from "../../components/common/CTA";

import LoginModal from "../../components/auth/LoginModal";
import Register from "../../components/auth/RegisterModal";

import { useModal } from "../../context/ModalContext";
import RegisterModal from "../../components/auth/RegisterModal";

const Home = () => {
  const { showLogin, showRegister } = useModal();

  return (
    <MainLayout>
      <Hero />

      <Features />

      <HowItWorks />

      <Stats />

      <CTA />

      {showLogin && <LoginModal />}

      {showRegister && <RegisterModal />}
    </MainLayout>
  );
};

export default Home;