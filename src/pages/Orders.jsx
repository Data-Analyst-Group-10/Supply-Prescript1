import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [newOrder, setNewOrder] = useState({
    product_id: "",
    quantity: "",
    customer_id: "",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  // Read Orders
  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders/");
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Input
  const handleChange = (e) => {
    setNewOrder({
      ...newOrder,
      [e.target.name]: e.target.value,
    });
  };

  // Add Order
  const addOrder = async () => {
    try {
      await API.post("/orders/", {
        product_id: Number(newOrder.product_id),
        quantity: Number(newOrder.quantity),
        customer_id: Number(newOrder.customer_id),
      });

      alert("Order Added Successfully");

      clearForm();
      fetchOrders();

    } catch (error) {
      console.error(error);
      alert("Failed to Add Order");
    }
  };

  // Edit Order
  const editOrder = (order) => {
    setEditingId(order.id);

    setNewOrder({
      product_id: order.product_id,
      quantity: order.quantity,
      customer_id: order.customer_id,
    });
  };

  // Update Order
  const updateOrder = async () => {
    try {
      await API.put(`/orders/${editingId}`, {
        product_id: Number(newOrder.product_id),
        quantity: Number(newOrder.quantity),
        customer_id: Number(newOrder.customer_id),
      });

      alert("Order Updated Successfully");

      clearForm();
      fetchOrders();

    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  // Delete Order
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await API.delete(`/orders/${id}`);

      alert("Order Deleted");

      fetchOrders();

    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  // Clear Form
  const clearForm = () => {
    setEditingId(null);

    setNewOrder({
      product_id: "",
      quantity: "",
      customer_id: "",
    });
  };

  // Search
  const filteredOrders = orders.filter((order) =>
    order.product_id.toString().includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Orders Management
      </h1>

      {/* Form */}

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">

        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Update Order" : "Add Order"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="number"
            name="product_id"
            placeholder="Product ID"
            value={newOrder.product_id}
            onChange={handleChange}
            className="border rounded p-2"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newOrder.quantity}
            onChange={handleChange}
            className="border rounded p-2"
          />

          <input
            type="number"
            name="customer_id"
            placeholder="Customer ID"
            value={newOrder.customer_id}
            onChange={handleChange}
            className="border rounded p-2"
          />

        </div>

        <div className="mt-5 space-x-3">

          <button
            onClick={editingId ? updateOrder : addOrder}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            {editingId ? "Update Order" : "Add Order"}
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
        placeholder="Search by Product ID..."
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
              <th className="p-3">Product ID</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Customer ID</th>
              <th className="p-3">Order Date</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr
                key={order.id}
                className="border-b text-center hover:bg-gray-100"
              >

                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.product_id}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3">{order.customer_id}</td>

                <td className="p-3">
                  {new Date(order.order_date).toLocaleString()}
                </td>

                <td className="p-3 space-x-2">

                  <button
                    onClick={() => editOrder(order)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteOrder(order.id)}
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

export default Orders;