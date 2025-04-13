import { NavLink } from "react-router-dom";

const DashboardNav = () => {
  return (
    <nav className="w-full flex flex-row justify-around items-center px-10">
      <NavLink
        to={"provider"}
        className={({ isActive }) =>
          `w-full text-center font-light p-2 rounded transition ${
            isActive
              ? "bg-blue-500 text-white dark:bg-blue-600"
              : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          }`
        }
      >
        Provider
      </NavLink>

      <NavLink
        to={"client"}
        className={({ isActive }) =>
          `w-full text-center font-light p-2 rounded transition ${
            isActive
              ? "bg-blue-500 text-white dark:bg-blue-600"
              : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
          }`
        }
      >
        Client
      </NavLink>
    </nav>
  );
};

export default DashboardNav;
