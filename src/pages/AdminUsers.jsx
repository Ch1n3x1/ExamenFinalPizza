import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:8081/pizzeria-api/get_users.php")
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

  const promote = (id) => {
    fetch("http://localhost:8081/pizzeria-api/promote_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(r => r.json())
      .then(() => {
        setUsers(prev =>
          prev.map(u => u.id === id ? { ...u, role: "admin" } : u)
        );
      });
  };

  const demote = (id) => {
    fetch("http://localhost:8081/pizzeria-api/demote_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(r => r.json())
      .then(() => {
        setUsers(prev =>
          prev.map(u => u.id === id ? { ...u, role: "user" } : u)
        );
      });
  };

  const remove = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    fetch("http://localhost:8081/pizzeria-api/delete_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(r => r.json())
      .then(() => setUsers(prev => prev.filter(u => u.id !== id)));
  };

  const filtered = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "all" ? true : u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ padding: 20 }}>
      <h1>👥 Gestión de Usuarios</h1>

      {/* Filtros */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, width: 250, marginRight: 10 }}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="all">Todos</option>
          <option value="admin">Admins</option>
          <option value="user">Usuarios</option>
        </select>
      </div>

      <table border="1" cellPadding="8" width="100%">
        <thead style={{ background: "#1d3557", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.created_at}</td>

              <td>
                {u.role !== "admin" ? (
                  <button onClick={() => promote(u.id)}>Hacer Admin</button>
                ) : (
                  <button onClick={() => demote(u.id)}>Quitar Admin</button>
                )}

                <button
                  onClick={() => remove(u.id)}
                  style={{ marginLeft: 10, background: "red", color: "white" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
