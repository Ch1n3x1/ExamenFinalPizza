export default function TableMap({ tables, selected, onSelect }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 15,
        marginBottom: 20
      }}
    >
      {tables.map((t) => {
        const occupied = t.occupied > 0;
        const isSelected = selected === t.id;

        return (
          <div
            key={t.id}
            onClick={() => {
              if (occupied) {
                alert("⛔ Esta mesa ya está ocupada");
                return;
              }
              onSelect(t.id);
            }}
            style={{
              padding: 20,
              textAlign: "center",
              borderRadius: 10,
              cursor: occupied ? "not-allowed" : "pointer",
              background: occupied
                ? "#e63946"
                : isSelected
                ? "#457b9d"
                : "#2a9d8f",
              color: "white",
              fontWeight: "bold"
            }}
          >
            Mesa {t.table_number}
            <br />
            {t.capacity} personas
            {occupied && (
              <div style={{ fontSize: 12, marginTop: 5 }}>
                Ocupada ❌
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
