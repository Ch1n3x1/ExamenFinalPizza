import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    fetch("http://localhost:8081/pizzeria-api/get_orders.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) setOrders(data.orders);
      });
  }, []);

  const updateStatus = (id, newStatus) => {
    fetch("http://localhost:8081/pizzeria-api/update_order_status.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(prev =>
            prev.map(o =>
              o.id === id ? { ...o, status: newStatus } : o
            )
          );
        }
      });
  };

  // 🔥 Nueva función para cancelar pedidos
  const cancelOrder = (id) => {
  console.log("ID recibido desde botón:", id);

  if (!window.confirm("¿Seguro que deseas CANCELAR este pedido?")) return;

  fetch("http://localhost:8081/pizzeria-api/cancel_order.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Respuesta de PHP:", data);
    });
};


  const filteredOrders = orders.filter(order => {
    if (filter === "todos") return true;
    if (filter === "pickup") return order.type === "pickup";
    if (filter === "delivery") return order.type === "delivery";
    if (filter === "pendiente") return order.status === "pendiente";
    if (filter === "entregado") return order.status === "entregado";
    if (filter === "cancelado") return order.status === "cancelado";
    return true;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Pedidos</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setFilter("todos")} style={btn}>Todos</button>
        <button onClick={() => setFilter("pickup")} style={btn}>Pickup</button>
        <button onClick={() => setFilter("delivery")} style={btn}>Delivery</button>
        <button onClick={() => setFilter("pendiente")} style={btn}>Pendientes</button>
        <button onClick={() => setFilter("entregado")} style={btn}>Entregados</button>
        <button onClick={() => setFilter("cancelado")} style={btn}>Cancelados</button>
      </div>

      <div style={{ overflowX: "auto", maxWidth: "100%" }}>
        <table border="1" cellPadding="10" style={{ width: "100%", background: "white", tableLayout: "fixed" }}>
          <thead style={{ background: "#e63946", color: "white" }}>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Tipo</th>
              <th>Pizzas</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer_name}</td>
                <td>{o.phone}</td>
                <td>{o.address}</td>
                <td>{o.type}</td>

                <td style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
                  {o.items}
                </td>

                <td>${o.total}</td>

                <td style={{ fontWeight: "bold" }}>
                  {o.status === "cancelado" ? "❌ Cancelado" : o.status}
                </td>

                <td>
                  {/* Cambiar estado */}
                  <select
                    value={o.status}
                    disabled={o.status === "cancelado"}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="preparando">Preparando</option>
                    <option value="en_camino">En Camino</option>
                    <option value="entregado">Entregado</option>
                  </select>

                  {/* Cancelar */}
                  <button
                    onClick={() => cancelOrder(o.id)}
                    style={{
                      marginLeft: 8,
                      background: "#d00000",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                    disabled={o.status === "cancelado" || o.status === "entregado"}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

const btn = {
  marginRight: "10px",
  padding: "8px 20px",
  background: "#457b9d",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px"
};
