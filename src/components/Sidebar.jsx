import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav className="flex flex-col gap-3">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/decks">Decks</NavLink>
        <NavLink to="/profile">Profile</NavLink>

        <button onClick={handleLogout} className="mt-4 text-left">
          Logout
        </button>
      </nav>
    </aside>
  );
}
