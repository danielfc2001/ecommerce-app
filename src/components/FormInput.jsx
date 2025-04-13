const FormInput = ({ type, placeholder, register, errors }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register}
      className={
        !errors
          ? `w-full p-2 border border-gray-300 rounded hover:border-blue-500 focus:outline-none focus:border-blue-500 transition duration-200 ease-in-out dark:text-white dark:placeholder:text-gray-400 dark:border-gray-400 dark:focus:bg-transparent`
          : `w-full p-2 border text-gray-800 dark:placeholder:text-gray-800 border-red-500 bg-red-100 rounded hover:border-red-500 focus:outline-none focus:border-red-500 transition duration-200 ease-in-out`
      }
    />
  );
};

export default FormInput;
