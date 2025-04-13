import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";

const links = [
  { to: "products", label: "Tus productos" },
  { to: "create", label: "Crear producto" },
  { to: "preferences", label: "Preferencias" },
];

const DashProvider = () => {
  return (
    <>
      <DashboardSidebar title="Proveedor" links={links} />
      <section className="w-full p-5">
        <Outlet />
      </section>
    </>
  );
};

export default DashProvider;
