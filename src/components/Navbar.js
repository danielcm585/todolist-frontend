export default function Navbar() {
  return (
    <div className="px-6 py-4 flex items-center justify-between shadow-lg">
      <p className="inline font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
        Todolist
      </p>
      <button 
        onClick={() => window.location.href='/login'} 
        className="border-2 rounded-md px-2 py-1"
      >
        Login
      </button>
    </div>
  );
}
