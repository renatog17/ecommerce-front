import { useEffect, useState, useMemo } from "react";
import { getProdutos, getCategorias } from "../api/apiService";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import Sidebar from "../components/Sidebar";
import ProdutoCard from "../components/ProdutoCard";
import CartComponent from "../components/CartComponent";

export default function CatalogPage() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);

  // ✅ Estado dos filtros
  const [filters, setFilters] = useState({
    categoria: "",
    precoMax: "",
  });

  const { authenticated } = useAuth();
  const { cartItems, addItem, finalizarPedido, loadingCart } = useCart();

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingProdutos(true);

        const produtosData = await getProdutos();
        const categoriasData = await getCategorias();

        setProdutos(produtosData);
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Erro ao carregar catálogo:", error);
      } finally {
        setLoadingProdutos(false);
      }
    }

    loadData();
  }, []);

  function handleAddToCart(produto) {
    addItem(produto.id, 1);
  }

  function handleConfirmPurchase() {
    finalizarPedido();
  }

  // ✅ Produtos filtrados (memoizado para performance)
  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) => {
      const matchCategoria =
        !filters.categoria ||
        produto.categoria?.id === Number(filters.categoria);

      const matchPreco =
        !filters.precoMax || produto.preco <= Number(filters.precoMax);

      return matchCategoria && matchPreco;
    });
  }, [produtos, filters]);
  console.log("Produtos filtrados:", produtosFiltrados);
  return (
    <div className="flex min-h-screen">
      <Sidebar
        filters={filters}
        onChange={setFilters}
        categorias={categorias}
      />

      <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadingProdutos ? (
          <p>Carregando produtos...</p>
        ) : (
          produtosFiltrados.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onAddToCart={() => handleAddToCart(produto)}
            />
          ))
        )}
      </div>

      {authenticated && (
        <CartComponent
          cartItems={cartItems}
          loading={loadingCart}
          onConfirm={handleConfirmPurchase}
        />
      )}
    </div>
  );
}
