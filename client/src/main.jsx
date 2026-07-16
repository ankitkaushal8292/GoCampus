import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ModalProvider>
        <App />
        <Toaster
  position="top-right"
  reverseOrder={false}
/>
      </ModalProvider>
    </AuthProvider>
  </StrictMode>
);