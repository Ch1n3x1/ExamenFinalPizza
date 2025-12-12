import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8081/pizzeria-api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (data.success) {
        setMsg("Registro exitoso. Ahora puedes iniciar sesión.");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setMsg(data.message || "Error al registrarse");
      }
    } catch {
      setMsg("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleRegister}>
        <h2 style={styles.title}>🍕 Crear Cuenta</h2>
        <p style={styles.subtitle}>Únete a Pizza Raul</p>

        {msg && <div style={styles.message}>{msg}</div>}

        <input
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p style={styles.footerText}>
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" style={styles.link}>
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}

/* ===== ESTILOS ===== */
const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f1f1"
  },
  card: {
    width: 380,
    padding: 30,
    background: "white",
    borderRadius: 10,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    textAlign: "center"
  },
  title: {
    marginBottom: 5,
    color: "#e63946"
  },
  subtitle: {
    marginBottom: 20,
    color: "#555"
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#e63946",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 15
  },
  footerText: {
    marginTop: 15,
    fontSize: 14
  },
  link: {
    color: "#e63946",
    textDecoration: "none",
    fontWeight: "bold"
  },
  message: {
    background: "#e7f7e7",
    color: "#2d6a4f",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    fontSize: 14
  }
};
