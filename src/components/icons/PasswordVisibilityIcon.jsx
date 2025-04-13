const PasswordVisibilityIcon = ({ isVisible, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer"
      aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
    >
      {isVisible ? (
        // Ícono de ojo abierto (simple)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 13.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
          />
        </svg>
      ) : (
        // Ícono de ojo cerrado (simple)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12c1.5-4.5 6-7.5 9-7.5s7.5 3 9 7.5-3 7.5-9 7.5-7.5-3-9-7.5zm9 4.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
          />
          <line
            x1="3"
            y1="3"
            x2="21"
            y2="21"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
};

export default PasswordVisibilityIcon;
