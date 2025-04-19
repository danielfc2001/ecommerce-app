import ProductCard from "./ProductCard";
import DashboardSearchBar from "./DashboardSearchBar";
import { useQuery } from "@tanstack/react-query";
import { getProviderProducts } from "../services/providerProducts";

const ProviderProducts = () => {
  const { isError, error, isPending, isSuccess, data } = useQuery({
    queryKey: ["providerProducts"],
    queryFn: getProviderProducts,
  });

  return (
    <section className="w-full">
      <DashboardSearchBar className={`mt-5`} />
      {isSuccess && data.products.length > 0 && (
        <div className="w-full bg-green-500 text-white text-center rounded-md p-2 my-2">
          Los productos han sido cargados satisfactoriamente.
        </div>
      )}
      {isSuccess && data.products.length === 0 && (
        <div className="w-full bg-yellow-500 text-white text-center rounded-md p-2 my-2">
          No tienes productos creados. Crea uno para comenzar a vender.
        </div>
      )}
      {isError && (
        <div className="w-full bg-red-500 text-white text-center rounded-md p-2 my-2">
          {error.message}
        </div>
      )}
      {isPending && (
        <div className="w-full bg-yellow-500 text-white text-center rounded-md p-2 my-2">
          Cargando productos...
        </div>
      )}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {!isPending &&
          !isError &&
          data.products.map((product) => (
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
      </div>
    </section>
  );
};

export default ProviderProducts;
