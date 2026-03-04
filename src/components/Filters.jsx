export default function Filters({ filters, onChange, categorias }) {
  return (
    <aside
      className="
        w-full
        lg:w-64
        bg-gray-100
        p-4
        border-b
        lg:border-b-0
        lg:border-r
        lg:border-gray-300
        lg:sticky
        lg:top-0
        lg:h-screen
      "
    >
      <h2 className="text-xl font-bold mb-4 text-black">Filtros</h2>

      <label className="block mb-2 text-sm font-medium text-black">Categoria</label>
      <select
        className="w-full border border-gray-400 rounded p-2 mb-4 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-600"
        value={filters.categoria}
        onChange={(e) =>
          onChange({ ...filters, categoria: e.target.value })
        }
      >
        <option value="">Todas</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nome}
          </option>
        ))}
      </select>

      <label className="block mb-2 text-sm font-medium text-black">
        Preço máximo
      </label>
      <input
        type="number"
        className="w-full border border-gray-400 rounded p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-600"
        value={filters.precoMax}
        onChange={(e) =>
          onChange({ ...filters, precoMax: e.target.value })
        }
      />
    </aside>
  );
}