const ScrollButton = ({ canScroll, onClick, className, children }) => {
  return (
    <button
      className={`${className} bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition ${
        !canScroll ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={!canScroll}
    >
      {children}
    </button>
  );
};

export default ScrollButton;
