import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Suppliers from "./pages/Suppliers";
import Prediction from "./pages/Prediction";

function App() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 min-w-64 min-h-screen bg-slate-900">
        <Sidebar />
      </aside>

      {/* Right Side */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-x-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/inventory"
              element={<Inventory />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

            <Route
              path="/suppliers"
              element={<Suppliers />}
            />

            <Route
              path="/prediction"
              element={<Prediction />}
            />
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;