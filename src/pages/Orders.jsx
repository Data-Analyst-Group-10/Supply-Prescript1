import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders/");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Orders Management
      </h1>

      <table className="table-auto w-full border-collapse border">

        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Product ID</th>
            <th className="border p-2">Customer ID</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Order Date</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.product_id}</td>
              <td className="border p-2">{order.customer_id}</td>
              <td className="border p-2">{order.quantity}</td>
              <td className="border p-2">{order.order_date}</td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}

export default Orders;