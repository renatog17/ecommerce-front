import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../api/apiService";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    try {
      await requestPasswordReset( email );
      setInfo("Se o email existir, você receberá uma chave por email.");
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 2000); 
    } catch {
      setError("Não foi possível enviar o email de recuperação.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Senha</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {info && <p className="text-green-500 text-sm mb-4 text-center">{info}</p>}

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email:
          </label>
          <input
            autoComplete="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Enviar Email
        </button>
      </form>
    </div>
  );
}