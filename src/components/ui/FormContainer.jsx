const FormContainer = ({ children }) => {
  return (
    <div className="w-full md:w-1/3 flex flex-col items-center justify-center shadow-md rounded-lg p-6 dark:bg-gray-800">
      {children}
    </div>
  );
};

export default FormContainer;
