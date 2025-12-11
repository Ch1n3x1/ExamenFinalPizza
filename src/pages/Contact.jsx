import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí podrías enviar a un PHP o API
    setSent(true);

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>

      {/* ==========================
          BANNER SUPERIOR
      ========================== */}
      <div style={banner}>
        <h1 style={bannerTitle}>Contacto 📞</h1>
        <p style={bannerSubtitle}>Estamos aquí para ayudarte</p>
      </div>

      {/* ==========================
          CONTENIDO PRINCIPAL
      ========================== */}
      <div style={sectionContainer}>

        {/* INFORMACIÓN DE CONTACTO */}
        <div style={infoBox}>
          <h2 style={title}>¿Dónde estamos?</h2>

          <p style={text}>📍 Dirección:</p>
          <p style={subText}>Jirón Bolognesi, Lima 15008 </p>

          <p style={text}>📞 Teléfono:</p>
          <p style={subText}>(01) 2078130</p>

          <p style={text}>💬 WhatsApp:</p>
          <p style={subText}>(01) 2078130</p>

          <p style={text}>🕒 Horario:</p>
          <p style={subText}>
            Lunes a Domingo <br />
            12:00 PM – 11:00 PM
          </p>
        </div>

        {/* FORMULARIO */}
        <div style={formBox}>
          <h2 style={title}>Envíanos un mensaje</h2>

          {sent && (
            <p style={{ color: "green", fontWeight: "bold" }}>
              ✔️ ¡Mensaje enviado! Te responderemos pronto.
            </p>
          )}

          <form onSubmit={handleSubmit}>

            <label style={label}>Nombre</label>
            <input
              type="text"
              required
              style={input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label style={label}>Correo electrónico</label>
            <input
              type="email"
              required
              style={input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label style={label}>Mensaje</label>
            <textarea
              required
              rows="5"
              style={textArea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" style={button}>Enviar Mensaje 📩</button>
          </form>
        </div>

      </div>

      {/* ==========================
          GOOGLE MAPS
      ========================== */}
      <div style={{ marginTop: 40 }}>
        <iframe
          title="Mapa"
          src="https://maps.google.com/maps?q=pizza&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

    </div>
  );
}

/* ==========================
   ESTILOS
========================== */

const banner = {
  height: "35vh",
  backgroundImage:
    "url('https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  textAlign: "center",
};

const bannerTitle = {
  fontSize: "42px",
  margin: 0,
};

const bannerSubtitle = {
  fontSize: "18px",
  marginTop: 10,
};

const sectionContainer = {
  display: "flex",
  justifyContent: "center",
  gap: 40,
  padding: "40px 20px",
  flexWrap: "wrap",
};

const infoBox = {
  width: 300,
  background: "white",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const formBox = {
  width: 350,
  background: "white",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const title = {
  marginBottom: 20,
  textAlign: "center",
  fontSize: "24px",
  color: "#1d3557",
};

const label = {
  fontWeight: "bold",
  fontSize: "14px",
};

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 15,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const textArea = {
  width: "100%",
  padding: 10,
  marginBottom: 15,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const button = {
  width: "100%",
  padding: 12,
  background: "#e63946",
  border: "none",
  color: "white",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 16,
};

const text = {
  fontWeight: "bold",
  marginTop: 10,
};

const subText = {
  marginBottom: 10,
  color: "#555",
};
