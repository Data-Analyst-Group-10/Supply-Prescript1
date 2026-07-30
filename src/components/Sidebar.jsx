import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed left-0 top-0 shadow-lg">

      <div className="p-6 text-center border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          SupplyPrescript
        </h1>
      </div>

      <nav className="mt-6">

        <Link
          to="/"
          className="block px-6 py-3 hover:bg-slate-700 transition"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/inventory"
          className="block px-6 py-3 hover:bg-slate-700 transition"
        >
          📦 Inventory
        </Link>

        <Link
          to="/orders"
          className="block px-6 py-3 hover:bg-slate-700 transition"
        >
          🛒 Orders
        </Link>

        <Link
          to="/suppliers"
          className="block px-6 py-3 hover:bg-slate-700 transition"
        >
          🏢 Suppliers
        </Link>

        <Link
          to="/prediction"
          className="block px-6 py-3 hover:bg-slate-700 transition"
        >
          🤖 Prediction
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;