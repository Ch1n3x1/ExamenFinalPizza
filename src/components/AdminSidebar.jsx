import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div style={{
      width: "220px",
      background: "#1d3557",
      color: "white",
      height: "100vh",
      padding: "20px",
      position: "fixed",
      top: 0,
      left: 0
    }}>
      <h2 style={{ marginBottom: 20 }}>Admin Panel</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link to="/admin/dashboard" style={linkStyle}>📊 Dashboard</Link>
        <Link to="/admin" style={linkStyle}>🏠 Inicio</Link>
        <Link to="/admin/orders" style={linkStyle}>📦 Pedidos</Link>
        <Link to="/admin/pizzas" style={linkStyle}>🍕 Pizzas</Link>
        <Link to="/menu" style={linkStyle}>📄 Vista de Clientes</Link>
      </nav>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  padding: "8px 12px",
  borderRadius: "6px",
  background: "#457b9d"
};
