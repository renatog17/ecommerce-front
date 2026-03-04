import { useEffect, useState, useMemo } from "react";
import { getProdutos, getCategorias } from "../api/apiService";
import { useCart } from "../context/CartContext";

import Filters from "../components/Filters";
import AccountMenu from "../components/AccountMenu";
import ProdutoCard from "../components/ProdutoCard";
import CartComponent from "../components/CartComponent";

import logo from "../assets/cigana_shop.png";

export default function CatalogPage() {
  const { cartItems, loadingCart, finalizarPedido, addItem } = useCart();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filters, setFilters] = useState({
    categoria: "",
    precoMax: "",
    search: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const produtosData = await getProdutos();
        const categoriasData = await getCategorias();
        setProdutos(produtosData);
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) => {
      const matchCategoria =
        !filters.categoria ||
        produto.categoria?.id === Number(filters.categoria);
      const matchPreco =
        !filters.precoMax || produto.preco <= Number(filters.precoMax);
      const matchSearch =
        !filters.search ||
        produto.nome.toLowerCase().includes(filters.search.toLowerCase());
      return matchCategoria && matchPreco && matchSearch;
    });
  }, [produtos, filters]);

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Top bar */}
      <header
        className="relative shadow px-6 py-4 flex items-center border-b border-gray-300"
        style={{ backgroundColor: "#2C1538" }}
      >
        <div className="shrink-0">
          <img
            src={logo}
            alt="Cigana Shop"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Barra de busca centralizada */}
        <div className="flex-1 flex justify-center absolute left-0 right-0 pointer-events-none">
          <div className="pointer-events-auto w-64">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="bg-gray-200 text-black border border-gray-400 rounded px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-gray-600"
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="ml-auto">
          <AccountMenu />
        </div>
      </header>
      <div className="flex flex-col lg:flex-row">
        {/* Filtros */}
        <Filters
          filters={filters}
          onChange={setFilters}
          categorias={categorias}
        />

        {/* Conteúdo principal */}
        <main className="flex-1 p-6 bg-gray-50">
          {produtosFiltrados.length === 0 ? (
            <p className="text-black">Nenhum produto encontrado.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {produtosFiltrados.map((produto) => (
                <ProdutoCard
                  key={produto.id}
                  produto={produto}
                  onAddToCart={() => addItem(produto.id)}
                />
              ))}
            </div>
          )}
        </main>

        {/* Carrinho */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l bg-white border-gray-300">
          <CartComponent
            cartItems={cartItems}
            loading={loadingCart}
            onConfirm={finalizarPedido}
          />
        </div>
      </div>
    </div>
  );
}
