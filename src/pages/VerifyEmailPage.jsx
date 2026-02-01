import { useState } from "react";
import {
  verifyEmail,
  resendVerificationToken as resendCode,
} from "../api/apiService";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyEmailPage() {
  const { state } = useLocation();
  const email = state?.email;
  const [code, setCode] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    verifyEmail(code)
      .then(() => {
        setStatus("success");
        setTimeout(() => navigate("/login"), 800);
      })
      .catch((err) => {
        const status = err.response?.status;
        if (status === 404) {
          setStatus("invalid-token");
        } else if (status === 410) {
          setStatus("expired-token");
        } else {
          setStatus("failed");
        }
      });
  };

  const handleResend = async () => {
    try {
      await resendCode( email );
      setStatus("resent");
    } catch (err) {
      setStatus("failed-resend");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Verify your email
        </h2>

        <p className="text-center text-gray-700 mb-4">
          A verification code was sent to:
          <span className="font-semibold"> {email}</span>
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Verification Code:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            className="w-full px-4 py-2 border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md 
                     hover:bg-blue-600 transition-colors mb-3"
        >
          Verify
        </button>

        <button
          onClick={handleResend}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md 
                     hover:bg-gray-300 transition-colors"
        >
          Resend code
        </button>

        <div className="mt-4 text-center">
          {status === "success" && (
            <p className="text-green-600 font-medium">
              Email verified successfully.
            </p>
          )}

          {status === "invalid-token" && (
            <p className="text-red-500 font-medium">Invalid code.</p>
          )}
           {status === "expired-token" && (
            <p className="text-red-500 font-medium">This code has expired. Send a new one.</p>
          )}

          {status === "resent" && (
            <p className="text-green-600 font-medium">A new code was sent.</p>
          )}

          {status === "failed-resend" && (
            <p className="text-red-500 font-medium">Could not resend code.</p>
          )}

          
        </div>
      </div>
    </div>
  );
}