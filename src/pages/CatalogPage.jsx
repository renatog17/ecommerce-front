import { useEffect, useState } from "react";
import { getProdutos } from "../api/apiService";

export default function CatalogPage() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await getProdutos();
        setProdutos(response.data.content); // <--- usar content
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando produtos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de Produtos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold">{produto.nome}</h2>
            <p className="text-gray-600 mt-1">{produto.descricao}</p>
            <p className="mt-2 font-bold text-green-600">
              R$ {produto.preco.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Categoria: {produto.categoria?.nome}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
