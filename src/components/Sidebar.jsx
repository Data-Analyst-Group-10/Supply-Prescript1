import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-6 py-3 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-200 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white z-50">
      
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-3xl font-bold">
          SupplyPrescript
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Supply Chain Management
        </p>
      </div>

      <nav className="py-4">
        <NavLink to="/" end className={linkClass}>
          🏠 Dashboard
        </NavLink>

        <NavLink to="/inventory" className={linkClass}>
          📦 Inventory
        </NavLink>

        <NavLink to="/orders" className={linkClass}>
          🛒 Orders
        </NavLink>

        <NavLink to="/suppliers" className={linkClass}>
          🏢 Suppliers
        </NavLink>

        <NavLink to="/prediction" className={linkClass}>
          🤖 Prediction
        </NavLink>
      </nav>

    </aside>
  );
}

export default Sidebar;