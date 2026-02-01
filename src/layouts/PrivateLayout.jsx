import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function PrivateLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
