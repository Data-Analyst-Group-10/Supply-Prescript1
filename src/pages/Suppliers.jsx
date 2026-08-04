import { useEffect, useState } from "react";
import API from "../services/api";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    rating: "",
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // ==========================
  // GET SUPPLIERS
  // ==========================
  const fetchSuppliers = async () => {
    try {
      const response = await API.get("/suppliers/");
      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  // INPUT CHANGE
  // ==========================
  const handleChange = (e) => {
    setNewSupplier({
      ...newSupplier,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // ADD / UPDATE SUPPLIER
  // ==========================
  const saveSupplier = async () => {
    try {
      if (editingId) {
        await API.put(`/suppliers/${editingId}`, {
          ...newSupplier,
          rating:
            newSupplier.rating === ""
              ? null
              : Number(newSupplier.rating),
        });

        alert("Supplier Updated Successfully");
      } else {
        await API.post("/suppliers/", {
          ...newSupplier,
          rating:
            newSupplier.rating === ""
              ? null
              : Number(newSupplier.rating),
        });

        alert("Supplier Added Successfully");
      }

      clearForm();
      fetchSuppliers();

    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  // ==========================
  // EDIT SUPPLIER
  // ==========================
  const editSupplier = (supplier) => {
    setEditingId(supplier.id);

    setNewSupplier({
      name: supplier.name,
      contact_person: supplier.contact_person,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      rating: supplier.rating ?? "",
    });
  };

  // ==========================
  // DELETE SUPPLIER
  // ==========================
  const deleteSupplier = async (id) => {
    if (!window.confirm("Delete this supplier?")) return;

    try {
      await API.delete(`/suppliers/${id}`);

      alert("Supplier Deleted Successfully");

      fetchSuppliers();

    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  // ==========================
  // CLEAR FORM
  // ==========================
  const clearForm = () => {
    setEditingId(null);

    setNewSupplier({
      name: "",
      contact_person: "",
      email: "",
      phone: "",
      address: "",
      rating: "",
    });
  };

  // ==========================
  // SEARCH
  // ==========================
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Suppliers Management
      </h1>

      {/* Form */}

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">

        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Update Supplier" : "Add Supplier"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Supplier Name"
            value={newSupplier.name}
            onChange={handleChange}
            className="border rounded p-2"
          />

          <input
            type="text"
            name="contact_person"
            placeholder="Contact Person"
            value={newSupplier.contact_person}
            onChange={handleChange}
            className="border rounded p-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newSupplier.email}
            onChange={handleChange}
            className="border rounded p-2"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newSupplier.phone}
            onChange={handleChange}
            className="border rounded p-2"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newSupplier.address}
            onChange={handleChange}
            className="border rounded p-2"
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={newSupplier.rating}
            onChange={handleChange}
            className="border rounded p-2"
          />

        </div>

        <div className="mt-5 space-x-3">

          <button
            onClick={saveSupplier}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            {editingId ? "Update Supplier" : "Add Supplier"}
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
        placeholder="Search Supplier..."
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
              <th className="p-3">Contact Person</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredSuppliers.map((supplier) => (

              <tr
                key={supplier.id}
                className="border-b text-center hover:bg-gray-100"
              >
                <td className="p-3">{supplier.id}</td>
                <td className="p-3">{supplier.name}</td>
                <td className="p-3">{supplier.contact_person}</td>
                <td className="p-3">{supplier.email}</td>
                <td className="p-3">{supplier.phone}</td>
                <td className="p-3">{supplier.address}</td>
                <td className="p-3">{supplier.rating}</td>

                <td className="p-3 space-x-2">

                  <button
                    onClick={() => editSupplier(supplier)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteSupplier(supplier.id)}
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

export default Suppliers;