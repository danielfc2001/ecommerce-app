import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import UserIcon from "../icons/UserIcon";
import LoginIcon from "../icons/LoginIcon";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, signOut } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="sticky top-0 lg:relative bg-white dark:bg-gray-800 shadow-md">
      <div className="flex flex-col lg:flex-row justify-between items-center mx-auto px-4 py-3">
        {/* Logo */}

        <div className="w-full lg:w-auto flex flex-row justify-between items-center">
          <Link
            className="text-2xl font-bold text-gray-800 dark:text-white"
            to="/"
          >
            ShoesPanel
          </Link>
          <ThemeToggler
            className={`block lg:hidden ml-auto mr-2`}
            onClickEvent={toggleTheme}
            theme={theme}
          />
          {/* Botón de menú móvil */}
          <button
            className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navegación */}
        <div
          className={`${
            isMobileMenuOpen ? "block opacity-100 scale-100" : "hidden"
          } lg:flex lg:flex-row lg:items-center lg:space-x-6 w-full lg:w-auto mt-5 lg:mt-0 transition-all duration-300 ease-in-out transform`}
        >
          <Link
            to="/"
            className="block text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition py-1 lg:py-0"
          >
            Inicio
          </Link>
          <Link
            to="/products"
            className="block text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition py-1 lg:py-0"
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
                  className="relative lg:absolute w-full right-0 mt-2 lg:w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-2"
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
          <ThemeToggler
            className={`hidden lg:block`}
            onClickEvent={toggleTheme}
            theme={theme}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
