import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [topPizzas, setTopPizzas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/pizzeria-api/get_dashboard_stats.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data.stats);
      });

    fetch("http://localhost:8081/pizzeria-api/get_top_pizzas.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) setTopPizzas(data.top);
      });
  }, []);

  return (
    <AdminLayout>
      <h1>📊 Dashboard</h1>

      {!stats ? (
        <p>Cargando estadísticas...</p>
      ) : (
        <>
          {/* ===================== TARJETAS ===================== */}
          <div style={{
            display: "flex",
            gap: 20,
            marginTop: 20,
            flexWrap: "wrap"
          }}>
            <Card
              title="Pedidos Totales"
              value={stats.totalOrders}
              color="#1d3557"
            />

            <Card
              title="Pedidos Entregados"
              value={stats.delivered}
              color="#2a9d8f"
            />

            <Card
              title="Pedidos Pendientes"
              value={stats.pending}
              color="#e76f51"
            />

            <Card
              title="Ventas Totales"
              value={`$${Number(stats.totalSales).toFixed(2)}`}
              color="#457b9d"
            />
          </div>

          {/* ===================== TOP PIZZAS ===================== */}
          <div style={{ marginTop: 40 }}>
            <h2>🍕 Pizzas Más Vendidas</h2>

            {topPizzas.length === 0 ? (
              <p>No hay datos todavía.</p>
            ) : (
              <ul style={{ fontSize: "18px" }}>
                {topPizzas.map((p, i) => (
                  <li key={i}>
                    #{i + 1} — {p.name} → {p.qty} ventas
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
}

function Card({ title, value, color }) {
  return (
    <div style={{
      background: color,
      padding: "20px",
      borderRadius: "10px",
      color: "white",
      flex: "1",
      minWidth: "200px"
    }}>
      <h3>{title}</h3>
      <p style={{ fontSize: "32px", marginTop: 10 }}>{value}</p>
    </div>
  );
}
