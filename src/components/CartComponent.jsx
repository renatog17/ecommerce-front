export default function CartComponent({ cartItems = [], loading, onConfirm }) {
  const total = cartItems.reduce((acc, item) => {
    return acc + item.valorUnitario * item.quantidade;
  }, 0);

  return (
    <div className="w-80 bg-white shadow-lg border-l p-6 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">
        Carrinho
      </h2>

      {loading ? (
        <p className="text-gray-500">Carregando carrinho...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="flex-1 overflow-y-auto space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="border rounded-lg p-3 flex flex-col gap-1 bg-gray-50"
              >
                <span className="font-medium">
                  {item.produtoNome || `Produto ${item.produtoId}`}
                </span>

                <div className="text-sm text-gray-600 flex justify-between">
                  <span>
                    {item.quantidade} x R$ {item.valorUnitario.toFixed(2)}
                  </span>
                  <span className="font-medium">
                    R$ {(item.valorUnitario * item.quantidade).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={onConfirm}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Finalizar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
}