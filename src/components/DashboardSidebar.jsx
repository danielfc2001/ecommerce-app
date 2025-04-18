import { useState } from "react";
import { NavLink } from "react-router-dom";

const DashboardSidebar = ({ title = "Sidebar", links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <aside className="w-full lg:w-64 flex flex-col lg:h-screen bg-gray-100 dark:bg-gray-800 shadow-md mb-3 lg:mb-0">
      {/* Título de la sección */}
      <div className="p-4 flex justify-between items-center text-2xl font-medium text-gray-800 dark:text-white">
        {title}
        {/* Botón de menú desplegable */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Menú de navegación */}
      <nav
        className={`flex flex-col space-y-2 mt-4 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
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
