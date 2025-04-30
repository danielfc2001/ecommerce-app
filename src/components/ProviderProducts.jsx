import ProductCard from "./ProductCard";
import DashboardSearchBar from "./DashboardSearchBar";
import { useQuery } from "@tanstack/react-query";
import { getProviderProducts } from "../services/providerProducts";
import Message from "./ui/Message";

const ProviderProducts = () => {
  const { isError, error, isPending, isSuccess, data } = useQuery({
    queryKey: ["providerProducts"],
    queryFn: getProviderProducts,
  });

  return (
    <section className="w-full">
      {/*       <DashboardSearchBar className={`mt-5`} /> */}
      {isSuccess && data.products.length > 0 && (
        <Message type={"success"}>
          Los productos han sido cargados satisfactoriamente
        </Message>
      )}
      {isSuccess && data.products.length === 0 && (
        <Message type={"warning"}>
          No tienes productos creados. Crea uno para comenzar a vender.
        </Message>
      )}
      {isError && <Message type={"error"}>{error.message}</Message>}
      {isPending && <Message type={"warning"}>Cargando Productos</Message>}
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
              dispatchEvent={"button"}
              view={"provider"}
              width={`full`}
            />
          ))}
      </div>
    </section>
  );
};

export default ProviderProducts;
