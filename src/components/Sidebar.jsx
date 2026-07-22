import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>SupplyPrescript</h2>

      <ul>
        <li><Link to="/">🏠 Dashboard</Link></li>
        <li><Link to="/inventory">📦 Inventory</Link></li>
        <li><Link to="/orders">🛒 Orders</Link></li>
        <li><Link to="/suppliers">🏢 Suppliers</Link></li>
        <li><Link to="/prediction">🤖 Prediction</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;