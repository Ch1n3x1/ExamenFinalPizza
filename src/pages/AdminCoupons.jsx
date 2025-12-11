import { useEffect, useState } from "react";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("percent");

  useEffect(() => {
    fetch("http://localhost:8081/pizzeria-api/get_coupons.php")
      .then(r => r.json())
      .then(d => setCoupons(d.coupons));
  }, []);

  const create = (e) => {
    e.preventDefault();

    fetch("http://localhost:8081/pizzeria-api/create_coupon.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, discount, type })
    })
      .then(() => {
        setCoupons([{ id: Date.now(), code, discount, type }, ...coupons]);
        setCode(""); setDiscount("");
      });
  };

  const remove = (id) => {
    fetch("http://localhost:8081/pizzeria-api/delete_coupon.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
      .then(() => setCoupons(coupons.filter(c => c.id !== id)));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🏷️ Cupones</h1>

      <form onSubmit={create}>
        <input placeholder="Código" value={code} onChange={e => setCode(e.target.value)} required />
        <input type="number" step="0.01" placeholder="Descuento" value={discount} onChange={e => setDiscount(e.target.value)} required />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="percent">%</option>
          <option value="fixed">Fijo</option>
        </select>
        <button>Crear Cupón</button>
      </form>

      <table border="1" cellPadding="8" width="100%" style={{ marginTop: 20 }}>
        <thead style={{ background: "#1d3557", color: "white" }}>
          <tr>
            <th>Código</th>
            <th>Descuento</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {coupons.map(c => (
            <tr key={c.id}>
              <td>{c.code}</td>
              <td>{c.discount}</td>
              <td>{c.type}</td>
              <td><button onClick={() => remove(c.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
