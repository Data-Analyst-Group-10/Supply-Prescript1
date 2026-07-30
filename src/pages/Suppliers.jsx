import { useEffect, useState } from "react";
import API from "../services/api";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await API.get("/suppliers/");
      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setNewSupplier({
      ...newSupplier,
      [e.target.name]: e.target.value,
    });
  };

  const addSupplier = async () => {
    try {
      await API.post("/suppliers/", newSupplier);

      alert("Supplier Added Successfully");

      setNewSupplier({
        name: "",
        contact_person: "",
        email: "",
        phone: "",
        address: "",
      });

      fetchSuppliers();
    } catch (error) {
      console.error(error);
      alert("Failed to Add Supplier");
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Suppliers Management
      </h1>

      {/* Add Supplier */}

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">

        <h2 className="text-2xl font-bold mb-4">
          Add Supplier
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
            className="border rounded p-2 md:col-span-2"
          />

        </div>

        <button
          onClick={addSupplier}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
        >
          Add Supplier
        </button>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Supplier..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 w-full md:w-80 mb-6"
      />

      {/* Suppliers Table */}

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
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Suppliers;