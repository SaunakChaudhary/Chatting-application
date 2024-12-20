import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserContext from "./Context/context.jsx";
import SocketContext from "./Context/socketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketContext>
      <UserContext>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </UserContext>
    </SocketContext>
  </StrictMode>
);