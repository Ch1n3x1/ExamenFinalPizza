import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={footer}>
      
      {/* CONTENEDOR GENERAL */}
      <div style={container}>

        {/* COLUMN 1 - LOGO */}
        <div style={col}>
          <h2 style={logo}>Pizza Raul</h2>
          <p style={text}>
            La mejor pizza artesanal con ingredientes frescos y sabor auténtico.
          </p>
        </div>

        {/* COLUMN 2 - LINKS */}
        <div style={col}>
          <h3 style={title}>Enlaces</h3>

          <Link to="/" style={link}>Inicio</Link>
          <Link to="/menu" style={link}>Menú</Link>
          <Link to="/about" style={link}>Sobre Nosotros</Link>
          <Link to="/contact" style={link}>Contacto</Link>
        </div>

        {/* COLUMN 3 - HORARIOS */}
        <div style={col}>
          <h3 style={title}>Horario</h3>
          <p style={text}>Lunes a Domingo</p>
          <p style={text}>11:00 AM - 11:00 PM</p>
        </div>

        {/* COLUMN 4 - CONTACTO */}
        <div style={col}>
          <h3 style={title}>Contáctanos</h3>
          <p style={text}>📍 Jirón Bolognesi, Lima 15008</p>
          <p style={text}>📞 (01) 2078130</p>
          <p style={text}>💬 WhatsApp: (01) 2078130</p>

          {/* Redes Sociales */}
          <div style={{ marginTop: 10 }}>
            <a href="https://www.facebook.com/PizzaRaulOficial" target="_blank" rel="noopener noreferrer" style={social}>📘</a>
            <a href="https://www.instagram.com/pizzaraul_oficial/?hl=es" target="_blank" rel="noopener noreferrer" style={social}>📸</a>
            <a href="https://x.com/PizzaPeru" target="_blank" rel="noopener noreferrer" style={social}>🐦</a>

          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div style={copyBox}>
        <p style={copy}>© {new Date().getFullYear()} Pizza Raul — Todos los derechos reservados.</p>
      </div>

    </footer>
  );
}

/* ==========================
   ESTILOS
========================== */

const footer = {
  background: "#111",
  color: "white",
  marginTop: 40,
  paddingTop: 40,
};

const container = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 40,
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 20px",
};

const col = {
  flex: "1 1 220px",
};

const logo = {
  fontSize: 28,
  color: "#ffd700",
  marginBottom: 10,
};

const title = {
  fontSize: 20,
  color: "#ffd700",
  marginBottom: 12,
};

const text = {
  color: "#ccc",
  marginBottom: 8,
};

const link = {
  display: "block",
  color: "#ccc",
  textDecoration: "none",
  marginBottom: 8,
  transition: "0.3s",
};

const social = {
  marginRight: 10,
  color: "#ffd700",
  fontSize: 22,
  textDecoration: "none",
};

const copyBox = {
  textAlign: "center",
  borderTop: "1px solid #222",
  marginTop: 30,
  padding: 20,
};

const copy = {
  color: "#777",
  fontSize: 14,
};
