import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [excelFile, setExcelFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    supplier_id: "",
  });

  // =========================
  // FETCH INVENTORY
  // =========================
  const fetchInventory = async () => {
    try {
      const response = await axios.get(`${API_URL}/inventory/`);

      console.log("Inventory response:", response.data);

      if (Array.isArray(response.data)) {
        setInventory(response.data);
      } else {
        setInventory([]);
      }
    } catch (error) {
      console.error("Inventory fetch error:", error);
      setInventory([]);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // CLEAR FORM
  // =========================
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

  // =========================
  // ADD INVENTORY
  // =========================
  const addInventory = async () => {
    if (!newItem.name.trim()) {
      alert("Please enter inventory name");
      return;
    }

    try {
      const data = {
        name: newItem.name,
        description: newItem.description,
        quantity: Number(newItem.quantity),
        price: Number(newItem.price),
        supplier_id: Number(newItem.supplier_id),
      };

      console.log("Adding inventory:", data);

      await axios.post(`${API_URL}/inventory/`, data);

      alert("Inventory Added Successfully");

      clearForm();
      await fetchInventory();
    } catch (error) {
      console.error("Add inventory error:", error);

      if (error.response) {
        console.error("Backend response:", error.response.data);
      }

      alert("Failed to Add Inventory");
    }
  };

  // =========================
  // EDIT INVENTORY
  // =========================
  const editInventory = (item) => {
    setEditingId(item.id);

    setNewItem({
      name: item.name || "",
      description: item.description || "",
      quantity: item.quantity ?? "",
      price: item.price ?? "",
      supplier_id: item.supplier_id ?? "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // UPDATE INVENTORY
  // =========================
  const updateInventory = async () => {
    if (!editingId) {
      return;
    }

    try {
      const data = {
        name: newItem.name,
        description: newItem.description,
        quantity: Number(newItem.quantity),
        price: Number(newItem.price),
        supplier_id: Number(newItem.supplier_id),
      };

      console.log("Updating inventory:", data);

      await axios.put(`${API_URL}/inventory/${editingId}`, data);

      alert("Inventory Updated Successfully");

      clearForm();
      await fetchInventory();
    } catch (error) {
      console.error("Update inventory error:", error);

      if (error.response) {
        console.error("Backend response:", error.response.data);
      }

      alert("Update Failed");
    }
  };

  // =========================
  // DELETE INVENTORY
  // =========================
  const deleteInventory = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inventory item?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/inventory/${id}`);

      alert("Inventory Deleted Successfully");

      await fetchInventory();
    } catch (error) {
      console.error("Delete inventory error:", error);

      if (error.response) {
        console.error("Backend response:", error.response.data);
      }

      alert("Delete Failed");
    }
  };

  // =========================
  // EXCEL UPLOAD
  // =========================
  const handleExcelUpload = async () => {
    if (!excelFile) {
      alert("Please select an Excel file");
      return;
    }

    const formData = new FormData();

    formData.append("file", excelFile);

    try {
      console.log("Uploading Excel:", excelFile.name);

      const response = await axios.post(
        `${API_URL}/inventory/upload`,
        formData
      );

      console.log("Excel upload response:", response.data);

      alert(
        response.data?.message
          ? `${response.data.message}\nRecords Imported: ${
              response.data.records_imported ?? "N/A"
            }`
          : "Excel Uploaded Successfully"
      );

      setExcelFile(null);

      const fileInput = document.getElementById("excel-upload");

      if (fileInput) {
        fileInput.value = "";
      }

      await fetchInventory();
    } catch (error) {
      console.error("Excel upload error:", error);

      if (error.response) {
        console.error("Backend response:", error.response.data);
      }

      alert("Excel Upload Failed");
    }
  };

  // =========================
  // SEARCH
  // =========================
  const filteredInventory = inventory.filter((item) =>
    String(item?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // UI
  // =========================
  return (
    <div className="p-6">

      {/* PAGE TITLE */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Inventory Management
        </h1>

        <p className="text-gray-500 mt-1">
          Manage inventory, products and stock levels
        </p>
      </div>

      {/* EXCEL UPLOAD */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Import Inventory from Excel
        </h2>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">

          <input
            id="excel-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => {
              setExcelFile(e.target.files?.[0] || null);
            }}
            className="border rounded-lg p-2"
          />

          <button
            type="button"
            onClick={handleExcelUpload}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Upload Excel
          </button>

        </div>

        {excelFile && (
          <p className="mt-3 text-sm text-gray-600">
            Selected file: {excelFile.name}
          </p>
        )}

      </div>

      {/* ADD / UPDATE FORM */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">

        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          {editingId ? "Update Inventory" : "Add Inventory"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newItem.name}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          {/* DESCRIPTION */}
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newItem.description}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          {/* QUANTITY */}
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          {/* PRICE */}
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            value={newItem.price}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          {/* SUPPLIER ID */}
          <input
            type="number"
            name="supplier_id"
            placeholder="Supplier ID"
            value={newItem.supplier_id}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

        </div>

        <div className="mt-5 flex gap-3">

          <button
            type="button"
            onClick={editingId ? updateInventory : addInventory}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            {editingId ? "Update Inventory" : "Add Inventory"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={clearForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}

        </div>

      </div>

      {/* SEARCH */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Search Inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 w-full md:w-80"
        />

      </div>

      {/* INVENTORY TABLE */}
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

            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (

                <tr
                  key={item.id}
                  className="border-b text-center hover:bg-gray-100"
                >

                  <td className="p-3">
                    {item.id}
                  </td>

                  <td className="p-3 font-semibold">
                    {item.name}
                  </td>

                  <td className="p-3">
                    {item.description || "-"}
                  </td>

                  <td className="p-3">
                    {item.quantity}
                  </td>

                  <td className="p-3">
                    ₹{item.price}
                  </td>

                  <td className="p-3">
                    {item.supplier_id}
                  </td>

                  <td className="p-3">

                    <div className="flex justify-center gap-2">

                      <button
                        type="button"
                        onClick={() => editInventory(item)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteInventory(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            ) : (

              <tr>

                <td
                  colSpan="7"
                  className="p-8 text-center text-gray-500"
                >
                  No inventory records found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Inventory;