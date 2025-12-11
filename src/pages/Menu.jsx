import React from "react";
import PizzaCard from "../components/PizzaCard";
import CartSummary from "../components/CartSummary";

export default function Menu() {

  const [pizzas, setPizzas] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8081/pizzeria-api/get_pizzas.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) setPizzas(data.pizzas);
      });
  }, []);

  return (
    <div style={container}>
      <div style={menuColumn}>
        <h1 style={{ marginBottom: 20 }}>Menú</h1>

        <div style={grid}>
          {pizzas.map((p) => (
            <PizzaCard key={p.id} pizza={p} />
          ))}
        </div>
      </div>

      <aside style={{ width: 280 }}>
        <CartSummary />
      </aside>
    </div>
  );
}

/* ======== ESTILOS ======== */

const container = {
  display: "flex",
  gap: 30,
  padding: "20px",
};

const menuColumn = {
  flex: 1,
};

const grid = {
  display: "flex",
  flexWrap: "wrap",
  gap: 20,
};
