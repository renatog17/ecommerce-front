import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import "modern-css-reset";

import { AuthProvider } from "./context/AuthContext.jsx";
import { UserDataProvider } from "./context/UserDataProvider.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
