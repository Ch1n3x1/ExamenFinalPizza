import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <aside style={sidebar}>
        <h2 style={sidebarTitle}>Admin Panel</h2>

        <Link to="/admin/dashboard" style={sideLink}>📊 Dashboard</Link>
        <Link to="/admin" style={sideLink}>🏠 Inicio Admin</Link>
        <Link to="/admin/orders" style={sideLink}>📦 Pedidos</Link>
        <Link to="/admin/pizzas" style={sideLink}>🍕 Pizzas</Link>
        <Link to="/admin/customers" style={sideLink}>👥 Vista de Clientes y Usuarios</Link>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main style={content}>
        {children}
      </main>

    </div>
  );
}

/* ESTILOS */
const sidebar = {
  width: "260px",
  height: "calc(100vh - 60px)", // deja espacio para el navbar
  background: "#1b2a41",
  position: "fixed",
  top: "60px",               // 🔥 debajo del NavBar
  left: 0,
  padding: "20px 10px",
  color: "white",
  overflowY: "auto",
};

const sidebarTitle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#ffd700",
};

const sideLink = {
  display: "block",
  padding: "12px 16px",
  marginBottom: "10px",
  background: "#243b55",
  borderRadius: "6px",
  textDecoration: "none",
  color: "white",
  transition: "0.3s",
};

const content = {
  marginLeft: "260px",      // 🔥 espacio para la sidebar
  marginTop: "60px",        // 🔥 espacio para el Navbar
  padding: "30px",
  width: "100%",
  minHeight: "100vh",
  background: "#f5f5f5",
};
