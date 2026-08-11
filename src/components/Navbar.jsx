function Navbar() {
  return (
    <header className="w-full h-20 bg-white border-b shadow-sm flex items-center justify-end px-6">

      <div className="flex items-center gap-4">

        <span className="font-semibold text-gray-700">
          Admin
        </span>

        <button
          type="button"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;