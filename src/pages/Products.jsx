import { useForm } from "react-hook-form";
import DashboardSearchBar from "../components/DashboardSearchBar";
import OffersSection from "../components/products/OffersSection";
import ProductFilters from "../components/products/ProductFilters";
import ProductSection from "../components/products/ProductSection";
import { useState } from "react";

const Products = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [filterCategory, setFilterCategory] = useState("all");

  const onSubmit = (data) => {
    console.log(data);
    setFilterCategory(data.category);
  };

  return (
    <div className="w-full dark:bg-gray-900 px-10 pt-10">
      <form
        className="w-full flex flex-col items-center justify-center gap-2 my-2 px-30"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ProductFilters register={register} errors={errors} />
        <DashboardSearchBar register={register} errors={errors} />
      </form>
      <OffersSection category={filterCategory} />
      <ProductSection category={filterCategory} />
    </div>
  );
};

export default Products;
