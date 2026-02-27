import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProdutoCard({ produto, onAddToCart }) {
  const { authenticated } = useAuth();
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    if (adding) return;

    setAdding(true);
    onAddToCart(produto);

    setTimeout(() => {
      setAdding(false);
    }, 2000); // 2 segundos desabilitado
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{produto.nome}</h2>

      <p className="text-gray-600 mt-1">{produto.descricao}</p>

      <p className="mt-2 font-bold text-green-600">
        R$ {produto.preco.toFixed(2)}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Categoria: {produto.categoria?.nome}
      </p>

      {authenticated && (
        <button
          onClick={handleAdd}
          disabled={adding}
          className={`mt-3 w-full py-2 rounded transition text-white
            ${adding 
              ? "bg-green-600 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}
          `}
        >
          {adding ? "Adicionado ✓" : "Adicionar ao carrinho"}
        </button>
      )}
    </div>
  );
}