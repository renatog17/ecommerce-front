export default function CartComponent({ cartItems = [], loading, onConfirm }) {
  const total = cartItems.reduce((acc, item) => {
    return acc + item.valorUnitario * item.quantidade;
  }, 0);

  return (
    <div className="w-80 bg-gray-100 shadow-lg border-l border-gray-300 p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-300 text-black">
        Carrinho
      </h2>

      {loading ? (
        <p className="text-black">Carregando carrinho...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-black">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="flex-1 overflow-y-auto space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="border rounded-lg p-3 flex flex-col gap-1 bg-white shadow-sm"
              >
                <span className="font-medium text-black">
                  {item.produtoNome || `Produto ${item.produtoId}`}
                </span>

                <div className="text-sm text-gray-700 flex justify-between">
                  <span>
                    {item.quantidade} x R$ {item.valorUnitario.toFixed(2)}
                  </span>
                  <span className="font-medium text-black">
                    R$ {(item.valorUnitario * item.quantidade).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t mt-4 pt-4 border-gray-300">
            <div className="flex justify-between font-semibold text-lg mb-4 text-black">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={onConfirm}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 rounded-lg transition"
            >
              Finalizar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
}