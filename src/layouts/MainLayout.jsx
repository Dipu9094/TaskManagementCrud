import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div>
        <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
      <footer className="bg-gray-100 text-center py-2 mt-4">
        © 2025 ProdMate
      </footer>
    </div>
  );
}
