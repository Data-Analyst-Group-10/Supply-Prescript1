function Navbar() {
  return (
    <div className="ml-64 bg-white shadow-md p-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-slate-800">
        SupplyPrescript
      </h1>

      <div className="flex items-center gap-4">
        <span className="font-semibold">
          Admin
        </span>

        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

    </div>
  );
}

export default Navbar;