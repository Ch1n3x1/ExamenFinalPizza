import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8081/pizzeria-api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = data.user.role === "admin" ? "/admin" : "/home";
      } else {
        setMsg(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      setMsg("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={styles.title}>🍕 Pizza Raul</h2>
        <p style={styles.subtitle}>Inicia sesión en tu cuenta</p>

        {msg && <div style={styles.error}>{msg}</div>}

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
          {loading ? "Ingresando..." : "Iniciar Sesión"}
        </button>

        <p style={styles.footerText}>
          ¿No tienes cuenta?{" "}
          <Link to="/register" style={styles.link}>
            Regístrate
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
    width: 360,
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
  error: {
    background: "#ffe0e0",
    color: "#b00020",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    fontSize: 14
  }
};
