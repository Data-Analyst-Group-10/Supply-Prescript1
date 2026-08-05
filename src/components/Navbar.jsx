function Navbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-8">

      <h1 className="text-2xl font-bold text-slate-800">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span className="font-semibold text-gray-700">
          Admin
        </span>

        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
          Logout
        </button>
      </div>

    </header>
  );
}

export default Navbar;