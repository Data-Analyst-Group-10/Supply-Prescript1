function Navbar() {
  return (
    <header className="h-24 bg-white border-b shadow-sm flex items-center justify-between px-6">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          SupplyPrescript
        </h1>

        <p className="text-sm text-gray-500">
          Supply Chain Management System
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-semibold text-gray-700">
          Admin
        </span>

        <button
          type="button"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

    </header>
  );
}

export default Navbar;