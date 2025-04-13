import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/dashboard/client", label: "Client" },
  { to: "/dashboard/provider", label: "Provider" },
  { to: "/settings", label: "Settings" },
];

const DashClient = () => {
  return (
    <>
      <DashboardSidebar title="Cliente" links={links} />
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default DashClient;
