import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{pizza, qty}]

  function addToCart(pizza, qty) {

    // 🔥 ARREGLA PRECIOS STRING — LOS CONVIERTE A NÚMERO
    const fixedPizza = {
      ...pizza,
      price: Number(pizza.price)  // <-- SOLUCIONA EL ERROR
    };

    setItems(prev => {
      const idx = prev.findIndex(i => i.pizza.id === pizza.id);

      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }

      return [...prev, { pizza: fixedPizza, qty }];
    });
  }

  function removeFromCart(pizzaId) {
    setItems(prev => prev.filter(i => i.pizza.id !== pizzaId));
  }

  function updateQty(pizzaId, qty) {
    setItems(prev =>
      prev.map(i =>
        i.pizza.id === pizzaId ? { ...i, qty } : i
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  // 🔥 AQUI TAMBIEN EVITAMOS EL ERROR
  const total = items.reduce((s, it) => {
    return s + Number(it.pizza.price) * it.qty;
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
}
