import { useState, useEffect } from "react";

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/pizzeria-api/get_drivers.php")
      .then(res => res.json())
      .then(data => setDrivers(data.drivers));
  }, []);

  const create = (e) => {
    e.preventDefault();

    fetch("http://localhost:8081/pizzeria-api/create_driver.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone })
    })
      .then(r => r.json())
      .then(data => {
        setDrivers([{ id: data.id, name, phone, active: 1 }, ...drivers]);
        setName("");
        setPhone("");
      });
  };

  const saveEdit = () => {
    fetch("http://localhost:8081/pizzeria-api/update_driver.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editing, name, phone })
    })
      .then(r => r.json())
      .then(() => {
        setDrivers(drivers.map(d => 
          d.id === editing ? { ...d, name, phone } : d
        ));
        setEditing(null);
        setName("");
        setPhone("");
      });
  };

  const toggle = (id, active) => {
    fetch("http://localhost:8081/pizzeria-api/toggle_driver.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active })
    })
    .then(() =>
      setDrivers(drivers.map(d =>
        d.id === id ? { ...d, active } : d
      ))
    );
  };

  const remove = (id) => {
    if (!window.confirm("¿Eliminar repartidor?")) return;

    fetch("http://localhost:8081/pizzeria-api/delete_driver.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
    .then(() =>
      setDrivers(drivers.filter(d => d.id !== id))
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚴 Repartidores</h1>

      {/* FORMULARIO */}
      <form onSubmit={editing ? saveEdit : create}>
        <input
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          placeholder="Teléfono"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <button type="submit">
          {editing ? "Guardar Cambios" : "Registrar Repartidor"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setName("");
              setPhone("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* TABLA */}
      <table border="1" cellPadding="8" width="100%" style={{ marginTop: 20 }}>
        <thead style={{ background: "#1d3557", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.phone}</td>
              <td>{d.active ? "Sí" : "No"}</td>

              <td>
                <button onClick={() => {
                  setEditing(d.id);
                  setName(d.name);
                  setPhone(d.phone);
                }}>
                  Editar
                </button>

                <button 
                  style={{ marginLeft: 8 }}
                  onClick={() => toggle(d.id, d.active ? 0 : 1)}
                >
                  {d.active ? "Desactivar" : "Activar"}
                </button>

                <button 
                  style={{ marginLeft: 8, background: "red", color: "white" }}
                  onClick={() => remove(d.id)}
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
