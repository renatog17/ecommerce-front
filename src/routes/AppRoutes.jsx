import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PrivateLayout from "../layouts/PrivateLayout";

import LoginPage from "../pages/LoginPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import ForgotPasswordPage from "../pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/ResetPasswordPage.jsx";
import VerifyEmailPage from "../pages/VerifyEmailPage.jsx";
import CatalogPage from "../pages/CatalogPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forget-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/" element={<CatalogPage />} />
      {/* Protected */}
      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
        </Route>
      </Route>
    </Routes>
  );
}
