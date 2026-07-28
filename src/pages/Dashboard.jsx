import { useEffect, useState } from "react";
import API from "../services/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function Dashboard() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [suppliers, setSuppliers] = useState(0);
  const [prediction, setPrediction] = useState("Loading...");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Orders
        const ordersResponse = await API.get("/orders/");
        setTotalOrders(ordersResponse.data.length);

        // Inventory
        const inventoryResponse = await API.get("/inventory/");
        setInventory(inventoryResponse.data.length);

        // Suppliers
        const suppliersResponse = await API.get("/suppliers/");
        setSuppliers(suppliersResponse.data.length);

        // Prediction
        setPrediction("Second Class");

      } catch (error) {
        console.error("Dashboard API Error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const chartData = [
    {
      name: "Orders",
      value: totalOrders,
    },
    {
      name: "Inventory",
      value: inventory,
    },
    {
      name: "Suppliers",
      value: suppliers,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        SupplyPrescript Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-lg p-5 text-center">
          <h2 className="text-lg font-semibold">
            🛒 Total Orders
          </h2>

          <p className="text-4xl font-bold mt-3 text-blue-600">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 text-center">
          <h2 className="text-lg font-semibold">
            📦 Inventory
          </h2>

          <p className="text-4xl font-bold mt-3 text-green-600">
            {inventory}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 text-center">
          <h2 className="text-lg font-semibold">
            🏢 Suppliers
          </h2>

          <p className="text-4xl font-bold mt-3 text-orange-600">
            {suppliers}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 text-center">
          <h2 className="text-lg font-semibold">
            🤖 Prediction
          </h2>

          <p className="text-xl font-bold mt-3 text-purple-600">
            {prediction}
          </p>
        </div>

      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-4">
          Dashboard Analytics
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Dashboard;