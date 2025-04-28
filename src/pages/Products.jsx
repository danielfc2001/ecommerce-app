import DashboardSearchBar from "../components/DashboardSearchBar";
import OffersSection from "../components/products/OffersSection";
import ProductSection from "../components/products/ProductSection";

const Products = () => {
  return (
    <div className="w-full dark:bg-gray-900 px-10 pt-10">
      <DashboardSearchBar className={`w-3/4 mx-auto`} />
      <OffersSection />
      <ProductSection />
    </div>
  );
};

export default Products;
