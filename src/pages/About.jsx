import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>

      {/* ==========================
          BANNER SUPERIOR
      ========================== */}
      <div style={banner}>
        <h1 style={bannerTitle}>Nuestra Historia 🍕</h1>
        <p style={bannerSubtitle}>Pasión, tradición y sabor desde 1995</p>
      </div>

      {/* ==========================
          SECCIÓN HISTORIA COMPLETA
      ========================== */}
      <div style={section}>
        <h2 style={sectionTitle}>Cómo empezó todo</h2>

        <p style={text}>
          La pizzería nació en 1995 como un pequeño negocio familiar. Con una receta
          de masa artesanal transmitida por tres generaciones, comenzamos horneando
          pizzas en un pequeño horno de piedra ubicado en la casa de nuestra abuela.
        </p>

        <p style={text}>
          Con el tiempo, la calidad de nuestras pizzas y el cariño puesto en cada
          preparación se hicieron conocidos en el vecindario. Las personas venían
          no solo por la comida, sino por la experiencia familiar y auténtica.
        </p>

        <img
          src="https://images.pexels.com/photos/265801/pexels-photo-265801.jpeg"
          alt="Pizzas tradicionales"
          style={bigImage}
        />

        <p style={text}>
          Tras años de trabajo, el pequeño local se convirtió en una pizzería formal
          y reconocida en la ciudad, siempre manteniendo la esencia original:
          ingredientes frescos, masa hecha a mano y un servicio cercano.
        </p>
      </div>

      {/* ==========================
          LÍNEA DEL TIEMPO
      ========================== */}
      <div style={{ ...section, background: "#f7f7f7" }}>
        <h2 style={sectionTitle}>Nuestra evolución</h2>

        <div style={timeline}>

          <div style={timelineItem}>
            <h3>1995</h3>
            <p>Iniciamos en un pequeño local con horno artesanal.</p>
          </div>

          <div style={timelineItem}>
            <h3>2005</h3>
            <p>Ampliamos menú e incorporamos nuevas recetas tradicionales.</p>
          </div>

          <div style={timelineItem}>
            <h3>2015</h3>
            <p>Implementamos servicio a domicilio con gran aceptación.</p>
          </div>

          <div style={timelineItem}>
            <h3>2024</h3>
            <p>Modernizamos el sistema de pedidos y abrimos página web.</p>
          </div>

        </div>
      </div>

      {/* ==========================
          MISIÓN Y VISIÓN
      ========================== */}
      <div style={section}>
        <h2 style={sectionTitle}>Misión y Visión</h2>

        <div style={missionVisionGrid}>

          <div style={mvCard}>
            <h3>🎯 Misión</h3>
            <p style={text}>
              Brindar la mejor experiencia gastronómica a través de pizzas artesanales
              elaboradas con productos de primera calidad.
            </p>
          </div>

          <div style={mvCard}>
            <h3>🌟 Visión</h3>
            <p style={text}>
              Convertirnos en la pizzería favorita de la región, expandiendo nuestra
              experiencia sin perder el toque familiar y tradicional.
            </p>
          </div>

        </div>
      </div>

      {/* ==========================
          LLAMADA A LA ACCIÓN
      ========================== */}
      <div style={{ ...section, textAlign: "center" }}>
        <h2 style={sectionTitle}>¿Listo para probar nuestras pizzas?</h2>

        <Link to="/menu">
          <button style={ctaButton}>Ver Menú 🍕</button>
        </Link>
      </div>

    </div>
  );
}

/* ==================================
   ESTILOS
================================== */

const banner = {
  height: "40vh",
  backgroundImage:
    "url('https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const bannerTitle = {
  fontSize: "48px",
  margin: 0,
  fontWeight: "bold",
};

const bannerSubtitle = {
  fontSize: "20px",
  marginTop: "10px",
};

const section = {
  padding: "50px 20px",
  maxWidth: 900,
  margin: "0 auto",
};

const sectionTitle = {
  fontSize: "32px",
  textAlign: "center",
  marginBottom: 25,
};

const text = {
  fontSize: "18px",
  color: "#444",
  marginBottom: 20,
  lineHeight: "1.6",
};

const bigImage = {
  width: "100%",
  borderRadius: 12,
  margin: "25px 0",
};

const timeline = {
  display: "flex",
  flexWrap: "wrap",
  gap: 20,
  justifyContent: "center",
};

const timelineItem = {
  width: 200,
  background: "white",
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const missionVisionGrid = {
  display: "flex",
  flexWrap: "wrap",
  gap: 20,
  justifyContent: "center",
};

const mvCard = {
  width: 260,
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const ctaButton = {
  padding: "15px 40px",
  background: "#e63946",
  color: "white",
  fontSize: "20px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};
