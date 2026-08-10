import React from "react";

function Inventory() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Inventory Management
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Inventory Test
        </h2>

        <p className="text-gray-600">
          Inventory page is working correctly.
        </p>

        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
          ✅ React Inventory component is working.
        </div>
      </div>
    </div>
  );
}

export default Inventory;