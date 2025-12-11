import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("Registrando...");

    try {
      const res = await fetch("http://localhost:8081/pizzeria-api/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMsg("✔ Registrado con éxito");
      } else {
        setMsg("❌ " + data.message);
      }

    } catch (error) {
      setMsg("❌ Error de conexión al backend");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Registro</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />

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

        <button type="submit">Registrarse</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}
