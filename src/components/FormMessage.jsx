const FormMessage = ({ type, children }) => {
  if (type === "success") {
    return (
      <div className="bg-green-400 text-white text-sm px-3 py-1 rounded-md shadow-md shadow-green-400">
        {children}
      </div>
    );
  }
  return (
    <div className="bg-red-400 text-white text-sm px-3 py-1 rounded-md shadow-md shadow-red-400">
      {children}
    </div>
  );
};

export default FormMessage;
