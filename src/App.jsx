import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Suppliers from "./pages/Suppliers";
import Prediction from "./pages/Prediction";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/prediction" element={<Prediction />} />
    </Routes>
  );
}

export default App;