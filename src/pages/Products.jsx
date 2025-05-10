import { Outlet } from "react-router-dom";

const Products = () => {
  return (
    <div className="w-full dark:bg-gray-900 px-10 pt-10">
      <Outlet />
    </div>
  );
};

export default Products;
