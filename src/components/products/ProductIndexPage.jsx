import { useForm } from "react-hook-form";
import DashboardSearchBar from "../DashboardSearchBar";
import OffersSection from "./OffersSection";
import ProductFilters from "./ProductFilters";
import ProductSection from "./ProductSection";
import { useState } from "react";

const ProductIndexPage = () => {
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
    <>
      <form
        className="w-full flex flex-col items-center justify-center gap-2 my-2 px-0 lg:px-30"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ProductFilters register={register} errors={errors} />
        <DashboardSearchBar register={register} errors={errors} />
      </form>
      <OffersSection category={filterCategory} />
      <ProductSection category={filterCategory} />
    </>
  );
};

export default ProductIndexPage;
