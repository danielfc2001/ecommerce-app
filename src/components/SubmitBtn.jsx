import SpinnerIcon from "./icons/SpinnerIcon";
const SubmitBtn = ({ isLoading, children }) => {
  return (
    <button
      className="w-full flex flex-row justify-center items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out cursor-pointer"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <SpinnerIcon /> <span>Cargando...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitBtn;
