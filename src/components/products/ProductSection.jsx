import { useState } from "react";
import { getGlobalProducts } from "../../services/products";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import ProductsNav from "./ProductsNav";
import Message from "../ui/Message";
import CardLoader from "../ui/CardLoader";

const ProductSection = ({ category }) => {
  const [page, setPage] = useState(1);
  const { isPending, isError, error, data, isFetching } = useQuery({
    queryKey: ["products", page, category],
    queryFn: () => getGlobalProducts(page, category),
    placeholderData: keepPreviousData,
  });

  const handleNextPage = () => {
    if (data.hasNextPage) {
      setPage(data.currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (data.hasPrevPage) {
      setPage(data.currentPage - 1);
    }
  };

  // Falta agregar el estado de carga del componente y el mensaje de error.
  return (
    <section>
      <h1 className="text-2xl text-center font-semibold dark:text-white">
        Our Products
      </h1>
      {isError && (
        <Message type={"error"}>
          {error.message || "A ocurrido un error al recuperar los productos."}
        </Message>
      )}
      {isPending && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
          <CardLoader count={10} />
        </section>
      )}
      {!isPending && !isError && !isFetching && (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
            {!isPending &&
              !isError &&
              data.products.length > 0 &&
              data.products?.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  img={product.image}
                  isOffer={product.isOffer}
                  discount={product.offerDiscount}
                  category={product.category}
                  currency={product.currency}
                  alterCurrency={product.alterCurrency}
                  dispatchEvent={"button"}
                  view={"global"}
                  width={`full`}
                />
              ))}
          </section>
          <ProductsNav
            current={data.currentPage ? data.currentPage : 1}
            next={data.hasNextPage ? data.nextPage : null}
            prev={data.hasPrevPage ? data.prevPage : null}
            onClickPrev={handlePrevPage}
            onClickNext={handleNextPage}
          />
        </>
      )}
    </section>
  );
};

export default ProductSection;
