import { useEffect, useState } from "react";
import API from "../services/api";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    supplier_id: "",
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await API.get("/inventory/");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/inventory/", {
        name: formData.name,
        description: formData.description,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        supplier_id: Number(formData.supplier_id),
      });

      alert("Inventory added successfully!");

      setFormData({
        name: "",
        description: "",
        quantity: "",
        price: "",
        supplier_id: "",
      });

      fetchInventory();

    } catch (error) {
      console.error("Add Inventory Error:", error);
      alert("Failed to add inventory.");
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Inventory Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <input
          type="number"
          name="supplier_id"
          placeholder="Supplier ID"
          value={formData.supplier_id}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          Add Inventory
        </button>

      </form>

      <table className="table-auto w-full border-collapse border border-gray-300">

        <thead className="bg-gray-100">

          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Supplier ID</th>
          </tr>

        </thead>

        <tbody>

          {inventory.length > 0 ? (
            inventory.map((item) => (
              <tr key={item.id}>

                <td className="border p-2">{item.id}</td>

                <td className="border p-2">{item.name}</td>

                <td className="border p-2">
                  {item.description}
                </td>

                <td className="border p-2">
                  {item.quantity}
                </td>

                <td className="border p-2">
                  ₹{item.price}
                </td>

                <td className="border p-2">
                  {item.supplier_id}
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="border p-4 text-center"
              >
                No Inventory Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Inventory;