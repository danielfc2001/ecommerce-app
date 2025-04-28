const Message = ({ type, children }) => {
  const selectType = (type) => {
    switch (type) {
      case "primary":
        return "bg-blue-500";
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-cyan-700";
    }
  };
  return (
    <div
      className={`w-full ${selectType(
        type
      )} text-white text-center rounded-md p-2 my-2`}
    >
      {children}
    </div>
  );
};

export default Message;
