import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      {/* =========================
          HERO / BANNER PRINCIPAL
      ========================== */}
      <div style={hero}>
        <div style={heroContent}>
          <h1 style={heroTitle}>La Mejor Pizza de la Ciudad 🍕</h1>
          <p style={heroSubtitle}>
            Masa fresca, ingredientes auténticos y sabor irresistible.
          </p>

          <Link to="/menu">
            <button style={heroButton}>Ver Menú</button>
          </Link>
        </div>
      </div>

      {/* =========================
          SECCIÓN HISTORIA
      ========================== */}
      <div style={section}>
        <h2 style={sectionTitle}>Nuestra Historia</h2>
        <p style={sectionText}>
          Fundada en 1995, nuestra pizzería nació con una misión: 
          ofrecer pizzas artesanales preparadas con ingredientes frescos y recetas tradicionales
          transmitidas de generación en generación.
        </p>

        <p style={sectionText}>
          Cada pizza se prepara a mano, con cariño y pasión por el verdadero sabor italiano.
        </p>
      </div>

      {/* =========================
          SECCIÓN POR QUÉ ELEGIRNOS
      ========================== */}
      <div style={{ ...section, background: "#f7f7f7" }}>
        <h2 style={sectionTitle}>¿Por qué elegirnos?</h2>

        <div style={featuresGrid}>

          <div style={featureCard}>
            <h3 style={featureTitle}>🍕 Ingredientes Frescos</h3>
            <p style={featureText}>
              Usamos productos locales y seleccionados al detalle.
            </p>
          </div>

          <div style={featureCard}>
            <h3 style={featureTitle}>🔥 Horno Tradicional</h3>
            <p style={featureText}>
              Nuestra masa se cocina en horno de piedra para un sabor auténtico.
            </p>
          </div>

          <div style={featureCard}>
            <h3 style={featureTitle}>🚚 Envíos Rápidos</h3>
            <p style={featureText}>
              Tu pizza llega caliente y lista para disfrutar.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

/* ============================
   ESTILOS
============================ */

const hero = {
  height: "60vh",
  backgroundImage:
    "url('https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "white",
  padding: "20px",
};

const heroContent = {
  background: "rgba(0,0,0,0.5)",
  padding: "30px 40px",
  borderRadius: "12px",
};

const heroTitle = {
  fontSize: "48px",
  margin: 0,
  marginBottom: "10px",
  fontWeight: "bold",
};

const heroSubtitle = {
  fontSize: "20px",
  marginBottom: "25px",
};

const heroButton = {
  padding: "12px 30px",
  background: "#e63946",
  color: "white",
  border: "none",
  fontSize: "18px",
  borderRadius: "8px",
  cursor: "pointer",
};

const section = {
  padding: "50px 20px",
  maxWidth: "900px",
  margin: "0 auto",
};

const sectionTitle = {
  textAlign: "center",
  fontSize: "32px",
  marginBottom: "25px",
};

const sectionText = {
  fontSize: "18px",
  color: "#444",
  marginBottom: "15px",
  textAlign: "center",
};

const featuresGrid = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  flexWrap: "wrap",
};

const featureCard = {
  width: "260px",
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const featureTitle = {
  marginBottom: "10px",
  fontSize: "20px",
};

const featureText = {
  color: "#555",
  fontSize: "16px",
};
