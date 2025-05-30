import SearchIcon from "./icons/SearchIcon";

const DashboardSearchBar = ({ register, errors }) => {
  return (
    <>
      <input
        type="search"
        {...register("search")}
        placeholder="Buscar productos..."
        className="w-full dark:text-white dark:placeholder:text-gray-200 border-1 border-gray-600 rounded-lg px-3 py-2 outline-0 focus:outline-0 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
      <button className="flex flex-grow justify-center items-center rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 px-3 py-2 transition-all duration-75 cursor-pointer ml-auto">
        <span className="mr-2">Buscar</span>
        <SearchIcon width={16} height={16} />
      </button>
    </>
  );
};

export default DashboardSearchBar;
