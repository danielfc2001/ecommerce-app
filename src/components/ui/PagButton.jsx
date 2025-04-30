const PagButton = ({ disabled, onClick, active, children }) => {
  return (
    <button
      className={`  dark:text-white px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:opacity-50 ${
        active ? "bg-blue-500" : "bg-gray-100 dark:bg-gray-800"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PagButton;
