import { useAuth } from "../context/AuthContext";

export default function AccountMenu() {
  const { authenticated, logout } = useAuth();

  return (
    <div className="flex items-center gap-2">
      {authenticated ? (
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      ) : (
        <>
          <a
            href="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Entrar
          </a>
          <a
            href="/signup"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Cadastrar
          </a>
        </>
      )}
    </div>
  );
}