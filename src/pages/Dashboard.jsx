import { Outlet } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import { useAuth } from "../hooks/useAuth";
import DashboardSidebar from "../components/DashboardSidebar";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <section className="w-full dark:bg-gray-900 p-5 pt-10">
      <div
        className="flex flex-col justify-center items-start
       text-center px-10"
      >
        <h1 className="text-5xl dark:text-white">Your personal Dashboard</h1>
        <p className="font-light text-lg dark:text-gray-200 mt-3">
          Welcome back:{" "}
          <span className="dark:text-white">
            {user.user ? user.user : "user"}
          </span>
        </p>
      </div>
      <div className="bg-gray-300 py-0.5 mx-10 mt-5"></div>
      <DashboardNav />
      <div className="bg-gray-300 py-0.5 mx-10"></div>
      <section className="w-full block lg:flex lg:flex-row lg:items-start lg:gap-3 px-10">
        <Outlet />
      </section>
    </section>
  );
};

export default Dashboard;
