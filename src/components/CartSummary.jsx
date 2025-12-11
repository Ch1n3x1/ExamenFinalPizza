import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSummary() {
  const { items, total, removeFromCart, updateQty, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid #ccc", padding: 15, width: 250 }}>
      <h3>Carrito</h3>

      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {items.map((it, index) => (
            <li key={index} style={{ marginBottom: 10 }}>
              <strong>{it.pizza.name}</strong><br />
              ${Number(it.pizza.price).toFixed(2)} x{" "}
              <input
                type="number"
                value={it.qty}
                min="1"
                style={{ width: 50 }}
                onChange={e => updateQty(it.pizza.id, Number(e.target.value))}
              />{" "}
              = ${Number(it.pizza.price * it.qty).toFixed(2)}

              <button
                onClick={() => removeFromCart(it.pizza.id)}
                style={{ marginLeft: 8 }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}

      <h4>Total: ${total.toFixed(2)}</h4>

      {items.length > 0 && (
        <>
          <button
            onClick={() => navigate("/checkout")}
            style={{ width: "100%", marginBottom: 8 }}
          >
            Ir a pagar 💳
          </button>

          <button
            onClick={clearCart}
            style={{ width: "100%" }}
          >
            Vaciar
          </button>
        </>
      )}
    </div>
  );
}
