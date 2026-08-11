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

      const orders = ordersResponse.data || [];
      const inventoryData = inventoryResponse.data || [];
      const suppliersData = suppliersResponse.data || [];

      setTotalOrders(orders.length);
      setInventory(inventoryData.length);
      setSuppliers(suppliersData.length);

      setRecentOrders(
        orders.slice(-5).reverse()
      );

      setPrediction("Second Class");
    } catch (error) {
      console.error("Dashboard API Error:", error);

      setPrediction("Unavailable");
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
    <div className="w-full max-w-full overflow-hidden">

      {/* Dashboard Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-1">
          Supply Chain Management Analytics
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full">

        {/* Orders */}
        <div className="bg-white rounded-xl shadow-md p-5 min-w-0">
          <h2 className="text-gray-500 text-lg font-semibold">
            🛒 Total Orders
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-4">
            {totalOrders}
          </p>
        </div>

        {/* Inventory */}
        <div className="bg-white rounded-xl shadow-md p-5 min-w-0">
          <h2 className="text-gray-500 text-lg font-semibold">
            📦 Inventory
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-4">
            {inventory}
          </p>
        </div>

        {/* Suppliers */}
        <div className="bg-white rounded-xl shadow-md p-5 min-w-0">
          <h2 className="text-gray-500 text-lg font-semibold">
            🏢 Suppliers
          </h2>

          <p className="text-4xl font-bold text-orange-600 mt-4">
            {suppliers}
          </p>
        </div>

        {/* Prediction */}
        <div className="bg-white rounded-xl shadow-md p-5 min-w-0">
          <h2 className="text-gray-500 text-lg font-semibold">
            🤖 Prediction
          </h2>

          <p className="text-2xl font-bold text-purple-600 mt-4 break-words">
            {prediction}
          </p>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6 w-full">

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-5 min-w-0">

          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Dashboard Analytics
          </h2>

          <div className="w-full h-[300px] min-w-0">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 10,
                }}
              >
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

        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-5 min-w-0">

          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Data Distribution
          </h2>

          <div className="w-full h-[300px] min-w-0">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius={100}
                  label
                >
                  {chartData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index]}
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

      {/* Monthly Orders */}
      <div className="bg-white rounded-xl shadow-md p-5 mt-6 min-w-0">

        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Monthly Orders Trend
        </h2>

        <div className="w-full h-[300px] min-w-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={lineData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
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

      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md p-5 mt-6 min-w-0">

        <h2 className="text-xl font-bold text-slate-800 mb-5">
          Recent Orders
        </h2>

        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[600px] text-sm">

            <thead className="bg-slate-800 text-white">

              <tr>
                <th className="p-3">
                  Order ID
                </th>

                <th className="p-3">
                  Product ID
                </th>

                <th className="p-3">
                  Quantity
                </th>

                <th className="p-3">
                  Customer ID
                </th>
              </tr>

            </thead>

            <tbody>

              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-100 text-center"
                  >

                    <td className="p-3">
                      {order.id}
                    </td>

                    <td className="p-3">
                      {order.product_id}
                    </td>

                    <td className="p-3">
                      {order.quantity}
                    </td>

                    <td className="p-3">
                      {order.customer_id}
                    </td>

                  </tr>

                ))
              ) : (

                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500"
                  >
                    No recent orders found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;