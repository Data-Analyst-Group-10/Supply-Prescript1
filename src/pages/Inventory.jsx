import { useEffect, useState } from "react";
import API, { uploadInventoryExcel } from "../services/api";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [excelFile, setExcelFile] = useState(null);

  const [newItem, setNewItem] = useState({
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
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setEditingId(null);
    setNewItem({
      name: "",
      description: "",
      quantity: "",
      price: "",
      supplier_id: "",
    });
  };

  const addInventory = async () => {
    try {
      await API.post("/inventory/", {
        name: newItem.name,
        description: newItem.description,
        quantity: Number(newItem.quantity),
        price: Number(newItem.price),
        supplier_id: Number(newItem.supplier_id),
      });

      alert("Inventory Added Successfully");
      clearForm();
      fetchInventory();
    } catch (error) {
      console.error(error);
      alert("Failed to Add Inventory");
    }
  };

  const editInventory = (item) => {
    setEditingId(item.id);

    setNewItem({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      supplier_id: item.supplier_id,
    });
  };

  const updateInventory = async () => {
    try {
      await API.put(`/inventory/${editingId}`, {
        name: newItem.name,
        description: newItem.description,
        quantity: Number(newItem.quantity),
        price: Number(newItem.price),
        supplier_id: Number(newItem.supplier_id),
      });

      alert("Inventory Updated Successfully");
      clearForm();
      fetchInventory();
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  const deleteInventory = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await API.delete(`/inventory/${id}`);
      alert("Inventory Deleted");
      fetchInventory();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const handleExcelUpload = async () => {
    if (!excelFile) {
      alert("Please select an Excel file.");
      return;
    }

    try {
      const response = await uploadInventoryExcel(excelFile);

      alert(
        `${response.message}\nRecords Imported: ${response.records_imported}`
      );

      setExcelFile(null);
      fetchInventory();
    } catch (error) {
      console.error(error);
      alert("Excel Upload Failed");
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Inventory Management
      </h1>

      {/* Excel Upload */}

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">

        <h2 className="text-xl font-bold mb-4">
          Import Inventory from Excel
        </h2>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setExcelFile(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={handleExcelUpload}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
        >
          Upload Excel
        </button>

      </div>

      {/* Add / Update Form */}

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">

        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Update Inventory" : "Add Inventory"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            className="border rounded p-2"
            name="name"
            placeholder="Name"
            value={newItem.name}
            onChange={handleChange}
          />

          <input
            className="border rounded p-2"
            name="description"
            placeholder="Description"
            value={newItem.description}
            onChange={handleChange}
          />

          <input
            className="border rounded p-2"
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={handleChange}
          />

          <input
            className="border rounded p-2"
            type="number"
            name="price"
            placeholder="Price"
            value={newItem.price}
            onChange={handleChange}
          />

          <input
            className="border rounded p-2"
            type="number"
            name="supplier_id"
            placeholder="Supplier ID"
            value={newItem.supplier_id}
            onChange={handleChange}
          />

        </div>

        <div className="mt-5 space-x-3">

          <button
            onClick={editingId ? updateInventory : addInventory}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            {editingId ? "Update Inventory" : "Add Inventory"}
          </button>

          {editingId && (
            <button
              onClick={clearForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>
          )}

        </div>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Inventory..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 w-full md:w-80 mb-6"
      />

      {/* Table */}

      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Supplier ID</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredInventory.map((item) => (

              <tr
                key={item.id}
                className="border-b text-center hover:bg-gray-100"
              >

                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">₹{item.price}</td>
                <td className="p-3">{item.supplier_id}</td>

                <td className="p-3 space-x-2">

                  <button
                    onClick={() => editInventory(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteInventory(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Inventory;