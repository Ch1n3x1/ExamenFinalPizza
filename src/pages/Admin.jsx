import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔒 Proteger ruta: solo admin
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div style={styles.container}>
      {/* === SIDEBAR === */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>🍕 Admin Panel</h2>

        <nav style={styles.menu}>
          <Link to="/admin/dashboard" style={styles.link}>📊 Dashboard</Link>
          <Link to="/admin/pizzas" style={styles.link}>🍕 Gestionar Pizzas</Link>
          <Link to="/admin/orders" style={styles.link}>📦 Pedidos</Link>
          <Link to="/admin/coupons" style={styles.link}>🏷️ Cupones</Link>
          <Link to="/admin/drivers" style={styles.link}>🚴 Repartidores</Link>
          <Link to="/" style={styles.link}>🏠 Ir al Inicio</Link>
          <Link to="/admin/users" style={styles.link}>👥 Usuarios</Link>

        </nav>
      </aside>

      {/* === CONTENIDO === */}
      <main style={styles.content}>
        <h1 style={styles.title}>Bienvenido, {user?.name}</h1>

        <p style={styles.subtitle}>Aquí puedes administrar toda la pizzería.</p>

        <div style={styles.cardsContainer}>

          {/* TARJETA 1 */}
          <Link to="/admin/dashboard" style={styles.card}>
            <h3>📊 Dashboard General</h3>
            <p>Ver estadísticas de ventas y pedidos.</p>
          </Link>

          {/* TARJETA 2 */}
          <Link to="/admin/pizzas" style={styles.card}>
            <h3>🍕 Administrar Pizzas</h3>
            <p>Crear, editar y eliminar pizzas.</p>
          </Link>

          {/* TARJETA 3 */}
          <Link to="/admin/orders" style={styles.card}>
            <h3>📦 Gestionar Pedidos</h3>
            <p>Ver pedidos, actualizar estado y cancelar.</p>
          </Link>

        </div>

        <p style={{ marginTop: 40, fontSize: 14, color: "#777" }}>
          Más módulos se pueden agregar: empleados, reportes, cupones, inventario, etc.
        </p>
      </main>
    </div>
  );
}

/* === ESTILOS === */
const styles = {
  container: {
    display: "flex",
    minHeight: "calc(100vh - 70px)", // evita que se esconda debajo del navbar
    background: "#f7f7f7",
  },
  sidebar: {
    width: 240,
    background: "#1d3557",
    color: "white",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: "70px",
    height: "calc(100vh - 70px)",
  },
  logo: {
    marginBottom: 30,
    fontWeight: "bold",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: 16,
    padding: "10px 12px",
    borderRadius: 6,
    transition: "0.2s",
  },
  content: {
    flex: 1,
    padding: "40px 50px",
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 30,
  },
  cardsContainer: {
    display: "flex",
    gap: 25,
    flexWrap: "wrap",
  },
  card: {
    background: "white",
    width: 260,
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
    textDecoration: "none",
    color: "black",
    transition: "0.2s",
  },
};
