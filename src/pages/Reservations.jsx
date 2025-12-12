import { useEffect, useState } from "react";
import TableMap from "../components/TableMap";

export default function Reservations() {
  const [tables, setTables] = useState([]);
  const [msg, setMsg] = useState("");
  const [available, setAvailable] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    table_id: null,
    date: "",
    time: ""
  });

  /* ===========================
     CARGAR MESAS SEGÚN FECHA/HORA
  ============================ */
  const loadTables = async (date, time) => {
    if (!date || !time) return;

    try {
      const res = await fetch(
        `http://localhost:8081/pizzeria-api/get_tables_status.php?date=${date}&time=${time}`
      );
      const data = await res.json();
      if (data.success) {
        setTables(data.tables);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ===========================
     VERIFICAR HORARIO BLOQUEADO
  ============================ */
  const checkBlockedHour = async () => {
    const res = await fetch(
      `http://localhost:8081/pizzeria-api/check_blocked_hour.php?date=${form.date}&time=${form.time}`
    );
    const data = await res.json();
    return data.blocked;
  };

  /* ===========================
     ENVIAR RESERVA
  ============================ */
  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.table_id) {
      setMsg("❌ Selecciona una mesa");
      return;
    }

    if (await checkBlockedHour()) {
      setMsg("⛔ La cocina está cerrada en ese horario");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8081/pizzeria-api/create_reservation.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      if (data.success) {
        setMsg("✅ Reserva confirmada");
        setForm({
          name: "",
          phone: "",
          table_id: null,
          date: "",
          time: ""
        });
        setTables([]);
      } else {
        setMsg("❌ " + data.message);
      }
    } catch (err) {
      setMsg("❌ Error al conectar con el servidor");
    }
  };

  /* ===========================
     UI
  ============================ */
  return (
    <div style={{ padding: 30, maxWidth: 700, margin: "auto" }}>
      <h1>🪑 Reservar Mesa</h1>

      {msg && <p style={{ fontWeight: "bold" }}>{msg}</p>}

      <form onSubmit={submit}>
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={input}
        />

        <input
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          style={input}
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => {
            const date = e.target.value;
            setForm({ ...form, date });
            loadTables(date, form.time);
          }}
          required
          style={input}
        />

        <input
          type="time"
          value={form.time}
          onChange={(e) => {
            const time = e.target.value;
            setForm({ ...form, time });
            loadTables(form.date, time);
          }}
          required
          style={input}
        />

        {/* MAPA VISUAL DE MESAS */}
        {tables.length > 0 && (
          <>
            <h3>Selecciona una mesa</h3>
            <TableMap
              tables={tables}
              selected={form.table_id}
              onSelect={(id) => setForm({ ...form, table_id: id })}
            />
          </>
        )}

        <button type="submit" style={btn}>
          Confirmar Reserva
        </button>
      </form>
    </div>
  );
}

/* ===========================
   ESTILOS SIMPLES
=========================== */
const input = {
  display: "block",
  width: "100%",
  padding: 10,
  marginBottom: 10
};

const btn = {
  padding: "12px 20px",
  background: "#2a9d8f",
  color: "white",
  border: "none",
  borderRadius: 6,
  fontSize: 16,
  cursor: "pointer"
};
