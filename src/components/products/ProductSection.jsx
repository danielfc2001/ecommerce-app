import { useState } from "react";
import { getGlobalProducts } from "../../services/products";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import ProductsNav from "./ProductsNav";

const ProductSection = () => {
  const [page, setPage] = useState(1);
  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["products", page],
      queryFn: () => getGlobalProducts(page),
      placeholderData: keepPreviousData,
    });
  return (
    <section>
      <h1 className="text-2xl text-center font-semibold dark:text-white">
        Our Products
      </h1>

      {!isPending && !isError && !isFetching && (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
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
                  stock={product.stock}
                  discount={product.offerDiscount}
                  category={product.category}
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
          />
        </>
      )}
    </section>
  );
};

export default ProductSection;
