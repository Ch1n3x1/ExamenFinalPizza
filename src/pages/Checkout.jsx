import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";

export default function Checkout() {
  const { items, total, clearCart } = useContext(CartContext);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("pickup");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      setMsg("Tu carrito está vacío.");
      return;
    }

    const order = {
      customer_name: customerName,
      phone,
      address,
      type,
      total,
      items
    };

    const res = await fetch("http://localhost:8081/pizzeria-api/create_order.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });

    const data = await res.json();

    if (data.success) {
      clearCart();
      setMsg("🍕 ¡Pedido creado con éxito! Gracias por tu compra.");
    } else {
      setMsg("Error al crear pedido.");
    }
  };

  return (
    <div style={page}>
      <h1 style={title}>🧾 Checkout</h1>

      <div style={container}>

        {/* COLUMNA IZQUIERDA - FORMULARIO */}
        <div style={leftColumn}>
          <h2 style={subtitle}>Datos del Cliente</h2>

          <form onSubmit={handleSubmit}>

            <label style={label}>Nombre</label>
            <input
              type="text"
              required
              style={input}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <label style={label}>Teléfono</label>
            <input
              type="text"
              required
              style={input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label style={label}>Dirección</label>
            <input
              type="text"
              placeholder="Solo si es delivery"
              style={input}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={type === "pickup"}   // 🔥 DESHABILITADO SI ES PICKUP
              required={type === "delivery"} // 🔥 OBLIGATORIO SI ES DELIVERY
            />


            <label style={label}>Método</label>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <button
                type="button"
                style={type === "pickup" ? activeTypeBtn : typeBtn}
                onClick={() => setType("pickup")}
              >
                🏪 Pickup
              </button>

              <button
                type="button"
                style={type === "delivery" ? activeTypeBtn : typeBtn}
                onClick={() => setType("delivery")}
              >
                🚚 Delivery
              </button>
            </div>

            <button type="submit" style={payButton}>
              Confirmar Pedido 💳
            </button>

          </form>

          {msg && <p style={message}>{msg}</p>}
        </div>

        {/* COLUMNA DERECHA - RESUMEN */}
        <div style={rightColumn}>
          <h2 style={subtitle}>Tu Pedido</h2>

          {items.length === 0 ? (
            <p style={{ color: "#666" }}>No tienes productos en el carrito.</p>
          ) : (
            <>
              {items.map((it, i) => (
                <div key={i} style={cartItem}>
                  <div>
                    <strong>{it.pizza.name}</strong>
                    <p style={{ margin: 0 }}>
                      {it.qty} × ${Number(it.pizza.price).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <strong>${Number(it.pizza.price * it.qty).toFixed(2)}</strong>
                  </div>
                </div>
              ))}

              <hr style={{ margin: "15px 0" }} />

              <h3 style={{ textAlign: "right" }}>
                Total: ${total.toFixed(2)}
              </h3>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

/* ================================
   ESTILOS
================================ */

const page = {
  padding: "20px",
  background: "#f7f7f7",
  minHeight: "100vh"
};

const container = {
  display: "flex",
  gap: 30,
  maxWidth: 1000,
  margin: "0 auto",
  marginTop: 20
};

const leftColumn = {
  flex: 1,
  background: "white",
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 0 10px rgba(0,0,0,0.1)"
};

const rightColumn = {
  width: 320,
  background: "white",
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 0 10px rgba(0,0,0,0.1)"
};

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 15,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 16
};

const title = {
  textAlign: "center"
};

const subtitle = {
  marginBottom: 15
};

const label = {
  fontWeight: "bold"
};

const typeBtn = {
  flex: 1,
  padding: 10,
  borderRadius: 8,
  border: "1px solid #aaa",
  background: "#eee",
  cursor: "pointer"
};

const activeTypeBtn = {
  ...typeBtn,
  background: "#1d3557",
  color: "white",
  border: "1px solid #1d3557"
};

const payButton = {
  width: "100%",
  padding: 15,
  background: "#e63946",
  color: "white",
  border: "none",
  borderRadius: 8,
  fontSize: 18,
  cursor: "pointer"
};

const message = {
  marginTop: 20,
  fontWeight: "bold",
  color: "green"
};

const cartItem = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,
  paddingBottom: 10,
  borderBottom: "1px solid #eee"
};
