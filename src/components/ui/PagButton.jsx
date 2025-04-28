const PagButton = ({ disabled, onClick, children }) => {
  return (
    <button
      className="bg-gray-100 dark:bg-gray-800 dark:text-white px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PagButton;
