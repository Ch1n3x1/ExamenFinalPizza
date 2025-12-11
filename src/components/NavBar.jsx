import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const linkStyle = {
    color: "white",
    marginRight: 16,
    textDecoration: "none",
    padding: "6px 10px",
    borderRadius: 6,
    transition: "0.3s",
  };

  const linkHover = {
    backgroundColor: "rgba(255,255,255,0.25)",
  };

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav
      style={{
        padding: 12,
        background: "#e63946",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* ==== LINKS IZQUIERDA ==== */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <HoverLink to="/" style={linkStyle} hover={linkHover}>Inicio</HoverLink>
        <HoverLink to="/menu" style={linkStyle} hover={linkHover}>Menú</HoverLink>
        <HoverLink to="/about" style={linkStyle} hover={linkHover}>Sobre Nosotros</HoverLink>
        <HoverLink to="/contact" style={linkStyle} hover={linkHover}>Contacto</HoverLink>
      </div>

      {/* ==== LINKS DERECHA ==== */}
      <div>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>Hola, {user.name}</span>

            {user.role === "admin" && (
              <HoverLink to="/admin" style={linkStyle} hover={linkHover}>
                Admin
              </HoverLink>
            )}

            <button
              onClick={handleLogout}
              style={{
                background: "white",
                color: "#e63946",
                border: "none",
                padding: "6px 12px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "bold",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <HoverLink to="/login" style={linkStyle} hover={linkHover}>Login</HoverLink>
            <HoverLink to="/register" style={linkStyle} hover={linkHover}>Registro</HoverLink>
          </>
        )}
      </div>
    </nav>
  );
}

/* ============================================
   COMPONENTE PARA AGREGAR HOVER FACILMENTE
=============================================== */
function HoverLink({ to, style, hover, children }) {
  return (
    <Link
      to={to}
      style={style}
      onMouseEnter={(e) => Object.assign(e.target.style, hover)}
      onMouseLeave={(e) =>
        Object.assign(e.target.style, {
          backgroundColor: "transparent",
        })
      }
    >
      {children}
    </Link>
  );
}

export default NavBar;
