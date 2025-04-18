import { useEffect } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import DashboardSearchBar from "./DashboardSearchBar";

const ProviderProducts = () => {
  const { message, pending, products, getUserProducts } = useProducts();

  useEffect(() => {
    getUserProducts();
  }, []);
  return (
    <section className="w-full">
      <DashboardSearchBar />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {pending && <div>Cargando productos...</div>}
        {!pending &&
          products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              img={product.image}
              isOffer={product.isOffer}
              stock={product.stock}
              discount={product.offerDiscount}
              category={product.category}
            />
          ))}
        {message.type === "error" && (
          <div>A ocurrido un error al cargar los productos</div>
        )}
      </div>
    </section>
  );
};

export default ProviderProducts;
