import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/authContext";
import UserIcon from "../icons/UserIcon";
import LoginIcon from "../icons/LoginIcon";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, signOut } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    // Lógica para cerrar sesión
    signOut();
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          <Link to="/">ShoesPanel</Link>
        </div>

        {/* Navegación */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Inicio
          </Link>
          <Link
            to="/products"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
          >
            Productos
          </Link>
          {user.isAuth && (
            <div className="relative">
              {/* Botón de perfil */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseOver={() => setIsDropdownOpen(true)}
                className="flex flex-row justify-center items-center rounded-xl py-2 px-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-100 transition-all duration-100 ease-in-out"
              >
                Your Profile
                <UserIcon width={24} height={20} />
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-2"
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
          {!user.isAuth && (
            <>
              <Link
                to={"/login"}
                className="flex flex-row justify-center items-center gap-1 rounded-xl py-2 px-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:text-gray-100 transition-all duration-100 ease-in-out"
              >
                Inicia Sesion
                <LoginIcon width={20} height={20} />
              </Link>
            </>
          )}
          {/* Botón de tema */}
          <ThemeToggler onClickEvent={toggleTheme} theme={theme} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
