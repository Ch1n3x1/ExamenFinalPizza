import { useEffect, useState } from "react";

export default function AdminPizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [msg, setMsg] = useState("");

  // Para edición
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/pizzeria-api/get_pizzas.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) setPizzas(data.pizzas);
      });
  }, []);

  // 🔵 SUBIR IMAGEN A PHP
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setMsg("Subiendo imagen...");

    const res = await fetch("http://localhost:8081/pizzeria-api/upload_image.php", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      setImageUrl(data.url);
      setMsg("Imagen subida correctamente ✔️");
    } else {
      setMsg("Error al subir imagen ❌");
    }
  };

  // CREAR NUEVA PIZZA
  const handleCreate = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8081/pizzeria-api/create_pizza.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, image_url: imageUrl })
    });

    const data = await res.json();

    if (data.success) {
      setPizzas(prev => [
        { id: data.id, name, description, price, image_url: imageUrl, active: 1 },
        ...prev
      ]);

      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setMsg("Pizza creada correctamente");
    }
  };

  // EDITAR PIZZA (cargar datos)
  const loadEdit = (pizza) => {
    setEditing(pizza.id);
    setName(pizza.name);
    setDescription(pizza.description);
    setPrice(pizza.price);
    setImageUrl(pizza.image_url);
  };

  // GUARDAR EDICIÓN
  const saveEdit = async () => {
    const res = await fetch("http://localhost:8081/pizzeria-api/update_pizza.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editing,
        name,
        description,
        price,
        image_url: imageUrl
      })
    });

    const data = await res.json();

    if (data.success) {
      setPizzas(prev =>
        prev.map(p =>
          p.id === editing
            ? { ...p, name, description, price, image_url: imageUrl }
            : p
        )
      );
      setEditing(null);
      setMsg("Pizza editada correctamente");
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    }
  };

  // ELIMINAR PIZZA
  const deletePizza = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta pizza?")) return;

    const res = await fetch("http://localhost:8081/pizzeria-api/delete_pizza.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    const data = await res.json();

    if (data.success) {
      setPizzas(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🍕 Administración de Pizzas</h1>

      {/* FORMULARIO */}
      <div style={{ marginBottom: 30 }}>
        <h2>{editing ? "Editar Pizza" : "Nueva Pizza"}</h2>

        <form onSubmit={editing ? e => { e.preventDefault(); saveEdit(); } : handleCreate}>
          
          {/* Nombre */}
          <input 
            placeholder="Nombre"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <br />

          {/* Descripción */}
          <input 
            placeholder="Descripción"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <br />

          {/* Precio */}
          <input 
            placeholder="Precio"
            type="number"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
          <br />

          {/* Subir imagen */}
          <label>Imagen:</label><br />
          <input type="file" onChange={handleUploadImage} />
          <br />

          {/* Vista previa */}
          {imageUrl && (
            <div style={{ marginTop: 10 }}>
              <p>Vista previa:</p>
              <img src={imageUrl} alt="" style={{ width: 120, borderRadius: 6 }} />
            </div>
          )}

          <br />

          <button type="submit">
            {editing ? "Guardar Cambios" : "Crear Pizza"}
          </button>

          {editing && (
            <button type="button" onClick={() => {
              setEditing(null);
              setName("");
              setDescription("");
              setPrice("");
              setImageUrl("");
            }}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      <p>{msg}</p>

      <h2>Listado de Pizzas</h2>

      <table border="1" cellPadding="8" style={{ width: "100%", background: "white" }}>
        <thead style={{ background: "#333", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {pizzas.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>${p.price}</td>
              <td>
                {p.image_url && (
                  <img src={p.image_url} alt="" style={{ width: 80, borderRadius: 6 }} />
                )}
              </td>
              <td>
                <button onClick={() => loadEdit(p)}>Editar</button>
                <button onClick={() => deletePizza(p.id)} style={{ marginLeft: 6 }}>
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
