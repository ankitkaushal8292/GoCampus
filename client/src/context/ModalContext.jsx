import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const openRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const closeRegister = () => {
    setShowRegister(false);
  };

  return (
    <ModalContext.Provider
      value={{
        showLogin,
        showRegister,
        openLogin,
        closeLogin,
        openRegister,
        closeRegister,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);