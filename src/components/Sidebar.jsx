import { useAuth } from "../context/AuthContext";

export default function Sidebar({ filters, onChange, categorias }) {
  const { authenticated, logout } = useAuth();

  return (
    <aside
      className="
        w-full
        lg:w-64
        bg-white
        p-4
        border-b
        lg:border-b-0
        lg:border-r
        lg:rounded-none
        lg:shadow-none
        lg:sticky
        lg:top-0
        lg:h-screen
      "
    >
      <h2 className="text-xl font-bold mb-4">Conta</h2>

      {authenticated ? (
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded mb-6"
        >
          Sair
        </button>
      ) : (
        <div>
          <a
            href="/login"
            className="block text-center bg-blue-500 text-white py-2 rounded mb-6"
          >
            Entrar
          </a>
          <a
            href="/signup"
            className="block text-center bg-green-500 text-white py-2 rounded"
          >
            Cadastrar
          </a>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Filtros</h2>

      <label className="block mb-2 text-sm font-medium">Categoria</label>
      <select
        className="w-full border rounded p-2 mb-4"
        value={filters.categoria}
        onChange={(e) => onChange({ ...filters, categoria: e.target.value })}
      >
        <option value="">Todas</option>

        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nome}
          </option>
        ))}
      </select>

      <label className="block mb-2 text-sm font-medium">Preço máximo</label>
      <input
        type="number"
        className="w-full border rounded p-2"
        value={filters.precoMax}
        onChange={(e) => onChange({ ...filters, precoMax: e.target.value })}
      />
    </aside>
  );
}
