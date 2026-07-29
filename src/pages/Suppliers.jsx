import { useEffect, useState } from "react";
import API from "../services/api";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Suppliers Management
      </h1>

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

            {suppliers.map((supplier) => (

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