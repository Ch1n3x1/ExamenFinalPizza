import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Intentando iniciar sesión...");

    try {
      const response = await fetch("http://localhost:8081/pizzeria-api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/home";
        }
      } else {
        setMsg(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("ERROR:", error);
      setMsg("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button type="submit">Iniciar Sesión</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}
