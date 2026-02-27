import { useAuth } from "./AuthContext";
import { createContext, useContext, useEffect, useState } from "react";
import { createPedido, getOpenPedido, finalizePedido } from "../api/apiService";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { authenticated, loading } = useAuth();

  const [pedidoId, setPedidoId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);

  async function loadOpenPedido() {
    try {
      setLoadingCart(true);

      const pedido = await getOpenPedido();
      

      if (!pedido) {
        setPedidoId(null);
        setCartItems([]);
        return;
      }

      setPedidoId(pedido.id);
      setCartItems(pedido.itens || []);
    } catch (error) {
      // se não existir pedido aberto, não é erro crítico
      setPedidoId(null);
      setCartItems([]);
    } finally {
      setLoadingCart(false);
    }
  }

  useEffect(() => {
    if (loading) return;

    if (authenticated) {
      loadOpenPedido();
    } else {
      setPedidoId(null);
      setCartItems([]);
    }
  }, [authenticated, loading]);

  async function addItem(idProduto, qtd = 1) {
    try {
      const response = await createPedido({
        itens: [
          {
            idProduto,
            qtd,
          },
        ],
      });
      console.log("Item adicionado ao pedido:", response.data);
      const pedidoAtualizado = response?.data;

      if (pedidoAtualizado) {
        setPedidoId(pedidoAtualizado.id);
        setCartItems(pedidoAtualizado.itens || []);
      } else {
        await loadOpenPedido();
      }
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  }

  async function finalizarPedido() {
    if (!pedidoId) return;

    try {
      
      await finalizePedido(pedidoId);

      // após finalizar, limpa localmente
      setPedidoId(null);
      setCartItems([]);

      // opcional: tentar carregar novo aberto (caso backend crie automático)
      await loadOpenPedido();
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        pedidoId,
        cartItems,
        loadingCart,
        addItem,
        finalizarPedido,
        reloadCart: loadOpenPedido,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
