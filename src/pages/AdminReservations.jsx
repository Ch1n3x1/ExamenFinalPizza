import { useEffect, useState } from "react";
import TableMap from "../components/TableMap";

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [editing, setEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    id: null,
    table_id: null,
    date: "",
    time: ""
  });

  /* =========================
     CARGAR RESERVAS
  ========================= */
  useEffect(() => {
    fetch("http://localhost:8081/pizzeria-api/get_reservations.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) setReservations(data.reservations);
      });
  }, []);

  /* =========================
     CARGAR MESAS (EXCLUYE RESERVA ACTUAL)
  ========================= */
  const loadTables = async (date, time, excludeId) => {
    if (!date || !time) return;

    const res = await fetch(
      `http://localhost:8081/pizzeria-api/get_tables_status.php?date=${date}&time=${time}&exclude_id=${excludeId}`
    );
    const data = await res.json();
    if (data.success) setTables(data.tables);
  };

  /* =========================
     CANCELAR RESERVA
  ========================= */
  const cancelReservation = async (id) => {
    if (!window.confirm("¿Seguro que deseas cancelar esta reserva?")) return;

    const res = await fetch(
      "http://localhost:8081/pizzeria-api/cancel_reservation.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      }
    );

    const data = await res.json();

    if (data.success) {
      setReservations(prev => prev.filter(r => r.id !== id));
    } else {
      alert(data.message || "Error al cancelar");
    }
  };

  /* =========================
     GUARDAR EDICIÓN (🔒 VALIDADO POR BACKEND)
  ========================= */
  const saveEdit = async () => {
    const res = await fetch(
      "http://localhost:8081/pizzeria-api/update_reservation.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    setReservations(prev =>
      prev.map(r =>
        r.id === editForm.id
          ? {
              ...r,
              table_id: editForm.table_id,
              table_number:
                tables.find(t => t.id === editForm.table_id)?.table_number,
              reservation_date: editForm.date,
              reservation_time: editForm.time
            }
          : r
      )
    );

    setEditing(false);
    setTables([]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🪑 Administración de Reservas</h1>

      {/* TABLA */}
      <table
        width="100%"
        cellPadding="10"
        style={{ background: "white", borderCollapse: "collapse" }}
      >
        <thead style={{ background: "#1d3557", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Mesa</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>Mesa {r.table_number}</td>
              <td>{r.reservation_date}</td>
              <td>{r.reservation_time}</td>
              <td>
                <button
                  onClick={() => {
                    setEditing(true);
                    setEditForm({
                      id: r.id,
                      table_id: r.table_id,
                      date: r.reservation_date,
                      time: r.reservation_time
                    });
                    loadTables(
                      r.reservation_date,
                      r.reservation_time,
                      r.id
                    );
                  }}
                >
                  ✏️ Editar
                </button>

                <button
                  onClick={() => cancelReservation(r.id)}
                  style={{
                    marginLeft: 8,
                    background: "#d00000",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: 4,
                    cursor: "pointer"
                  }}
                >
                  ❌ Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FORMULARIO EDICIÓN */}
      {editing && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 8
          }}
        >
          <h3>✏️ Editar Reserva #{editForm.id}</h3>

          <input
            type="date"
            value={editForm.date}
            onChange={(e) => {
              const date = e.target.value;
              setEditForm({ ...editForm, date });
              loadTables(date, editForm.time, editForm.id);
            }}
          />

          <input
            type="time"
            value={editForm.time}
            onChange={(e) => {
              const time = e.target.value;
              setEditForm({ ...editForm, time });
              loadTables(editForm.date, time, editForm.id);
            }}
          />

          <TableMap
            tables={tables}
            selected={editForm.table_id}
            onSelect={(id) =>
              setEditForm({ ...editForm, table_id: id })
            }
          />

          <button onClick={saveEdit} style={{ marginTop: 10 }}>
            Guardar Cambios
          </button>

          <button
            onClick={() => {
              setEditing(false);
              setTables([]);
            }}
            style={{ marginLeft: 10 }}
          >
            Cancelar Edición
          </button>
        </div>
      )}
    </div>
  );
}
