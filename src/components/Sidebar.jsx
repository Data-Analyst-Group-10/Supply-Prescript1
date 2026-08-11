import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-3 text-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-200 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white">

      {/* Logo */}
      <div className="px-4 py-4 border-b border-slate-700">
        <h1 className="text-3xl font-bold">
          SupplyPrescript
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Supply Chain Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="py-2">

        <NavLink
          to="/"
          end
          className={linkClass}
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/inventory"
          className={linkClass}
        >
          📦 Inventory
        </NavLink>

        <NavLink
          to="/orders"
          className={linkClass}
        >
          🛒 Orders
        </NavLink>

        <NavLink
          to="/suppliers"
          className={linkClass}
        >
          🏢 Suppliers
        </NavLink>

        <NavLink
          to="/prediction"
          className={linkClass}
        >
          🤖 Prediction
        </NavLink>

      </nav>

    </div>
  );
}

export default Sidebar;