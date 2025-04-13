import { NavLink } from "react-router-dom";

const DashboardSidebar = ({ title = "Sidebar", links }) => {
  return (
    <aside className="w-64 h-screen bg-gray-100 dark:bg-gray-800 shadow-md flex flex-col">
      <div className="p-4 text-2xl font-medium text-gray-800 dark:text-white">
        {title}
      </div>
      <nav className="flex flex-col space-y-2 mt-4">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded transition ${
                isActive
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
