import { useEffect, useState } from "react";
import API from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function Dashboard() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [suppliers, setSuppliers] = useState(0);
  const [prediction, setPrediction] = useState("Loading...");
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [
        ordersResponse,
        inventoryResponse,
        suppliersResponse,
      ] = await Promise.all([
        API.get("/orders/"),
        API.get("/inventory/"),
        API.get("/suppliers/"),
      ]);

      setTotalOrders(ordersResponse.data.length);
      setRecentOrders(
        ordersResponse.data.slice(-5).reverse()
      );

      setInventory(inventoryResponse.data.length);
      setSuppliers(suppliersResponse.data.length);

      setPrediction("Second Class");

    } catch (error) {
      console.error("Dashboard API Error:", error);
    }
  };

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

  const lineData = [
    { month: "Jan", orders: 2 },
    { month: "Feb", orders: 4 },
    { month: "Mar", orders: 6 },
    { month: "Apr", orders: 3 },
    { month: "May", orders: 7 },
    { month: "Jun", orders: totalOrders },
  ];

  const COLORS = [
    "#2563EB",
    "#22C55E",
    "#F97316",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold mb-8">
        SupplyPrescript Dashboard
      </h1>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600">
            🛒 Total Orders
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-4">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600">
            📦 Inventory
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-4">
            {inventory}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600">
            🏢 Suppliers
          </h2>

          <p className="text-4xl font-bold text-orange-600 mt-4">
            {suppliers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-600">
            🤖 Prediction
          </h2>

          <p className="text-2xl font-bold text-purple-600 mt-4">
            {prediction}
          </p>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

        {/* Bar Chart */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Dashboard Analytics
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#2563EB"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Pie Chart */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Data Distribution
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >

                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Line Chart */}

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Monthly Orders Trend
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={lineData}>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#2563EB"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Recent Orders */}

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Recent Orders
        </h2>

        <table className="w-full border-collapse">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Product ID</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Customer ID</th>
            </tr>

          </thead>

          <tbody>

            {recentOrders.map((order) => (

              <tr
                key={order.id}
                className="border-b hover:bg-gray-100 text-center"
              >

                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.product_id}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3">{order.customer_id}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;