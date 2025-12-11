import React, { useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function PizzaCard({ pizza }) {
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  return (
    <div style={card}>
      <img
        src={pizza.image_url || "/placeholder.png"}
        alt={pizza.name}
        style={image}
      />

      <h3 style={name}>{pizza.name}</h3>
      <p style={description}>{pizza.description}</p>

      <div style={bottomRow}>
        <strong style={price}>${Number(pizza.price).toFixed(2)}</strong>

        <div style={qtyContainer}>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) =>
              setQty(Math.max(1, Number(e.target.value) || 1))
            }
            style={qtyInput}
          />

          <button
            onClick={() => addToCart(pizza, qty)}
            style={addButton}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===============================
   ESTILOS
=============================== */

const card = {
  width: 260,
  background: "white",
  borderRadius: 12,
  padding: 15,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
};

const image = {
  width: "100%",
  height: 160,
  objectFit: "cover",
  borderRadius: 10,
  marginBottom: 10,
};

const name = {
  margin: "5px 0 8px 0",
};

const description = {
  fontSize: 14,
  color: "#555",
  flexGrow: 1,
  minHeight: 50,
};

const bottomRow = {
  marginTop: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const price = {
  fontSize: 20,
  fontWeight: "bold",
  color: "#1d3557",
};

const qtyContainer = {
  display: "flex",
  alignItems: "center",
};

const qtyInput = {
  width: 50,
  padding: 5,
  marginRight: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const addButton = {
  padding: "8px 12px",
  background: "#e63946",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
};
