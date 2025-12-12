import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // =========================
  // Cargar usuarios al abrir
  // =========================
  useEffect(() => {
    fetch("http://localhost:8081/pizzeria-api/get_users.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) setUsers(data.users);
      });
  }, []);

  // =========================
  // HACER ADMIN
  // =========================
  const promote = (id) => {
    fetch("http://localhost:8081/pizzeria-api/promote_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setUsers(prev =>
            prev.map(u =>
              u.id === id ? { ...u, role: "admin" } : u
            )
          );
        }
      });
  };

  // =========================
  // QUITAR ADMIN
  // =========================
  const demote = (id) => {
    fetch("http://localhost:8081/pizzeria-api/demote_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setUsers(prev =>
            prev.map(u =>
              u.id === id ? { ...u, role: "user" } : u
            )
          );
        }
      });
  };

  // =========================
  // ELIMINAR USUARIO
  // =========================
  const remove = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    fetch("http://localhost:8081/pizzeria-api/delete_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(r => r.json())
      .then((data) => {
        if (data.success) {
          setUsers(prev => prev.filter(u => u.id !== id));
        }
      });
  };

  // =========================
  // FILTROS
  // =========================
  const filtered = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "all" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // =========================
  // RENDER
  // =========================
  return (
    <div style={{ padding: 20 }}>
      <h1>👥 Gestión de Usuarios</h1>

      {/* ------- FILTROS ------- */}
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 8,
            width: 280,
            borderRadius: 5,
            border: "1px solid #ccc"
          }}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ padding: 8, borderRadius: 5, border: "1px solid #ccc" }}
        >
          <option value="all">Todos</option>
          <option value="admin">Admins</option>
          <option value="user">Usuarios</option>
        </select>
      </div>

      {/* ------- TABLA ------- */}
      <table
        border="1"
        cellPadding="8"
        width="100%"
        style={{ borderCollapse: "collapse", background: "white" }}
      >
        <thead style={{ background: "#1d3557", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Registrado</th>
            <th style={{ width: 180 }}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                No se encontraron usuarios.
              </td>
            </tr>
          ) : (
            filtered.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td style={{ fontWeight: "bold" }}>
                  {u.role === "admin" ? "🛡️ Admin" : "👤 Usuario"}
                </td>
                <td>{u.created_at}</td>

                <td>
                  {/* Botón de Admin / User */}
                  {u.role !== "admin" ? (
                    <button
                      onClick={() => promote(u.id)}
                      style={{ marginRight: 8 }}
                    >
                      Hacer Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => demote(u.id)}
                      style={{ marginRight: 8 }}
                    >
                      Quitar Admin
                    </button>
                  )}

                  {/* Botón eliminar */}
                  <button
                    onClick={() => remove(u.id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: 4,
                      cursor: "pointer"
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
