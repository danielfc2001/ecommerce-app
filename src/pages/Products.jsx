import { useQuery } from "@tanstack/react-query";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { getGlobalOfferProducts } from "../services/products";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import ScrollButton from "../components/products/ScrollButton";
import useProductsScroll from "../hooks/useProductsScroll";

const Products = () => {
  const { isError, isPending, error, data } = useQuery({
    queryKey: ["offerProducts"],
    queryFn: getGlobalOfferProducts,
  });
  const {
    canScrollLeft,
    canScrollRight,
    sliderRef,
    handleScroll,
    setScrollRef,
  } = useProductsScroll();

  useEffect(() => {
    console.log(data);
    setScrollRef();
  }, [data]);

  return (
    <div className="w-full dark:bg-gray-900 px-10 pt-10">
      <DashboardSearchBar className={`w-3/4 mx-auto`} />
      <section className="w-full rounded-lg mt-5 p-2">
        {/* Mensajes de carga o error */}
        {isPending && (
          <div className="w-full bg-yellow-500 text-white text-center rounded-md p-2 my-2">
            Cargando productos...
          </div>
        )}
        {isError && (
          <div className="w-full bg-red-500 text-white text-center rounded-md p-2 my-2">
            {error.message}
          </div>
        )}

        {/* Slider de productos */}
        {!isPending && !isError && (
          <div className="relative">
            {/* Contenedor del slider */}
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
            >
              {data.products?.map((product) => (
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
                  dispatchEvent={"self"}
                  view={"global"}
                  width={`60`}
                />
              ))}
            </div>
            <ScrollButton
              canScroll={canScrollLeft}
              onClick={() =>
                sliderRef.current.scrollBy({
                  left: -300,
                  behavior: "smooth",
                })
              }
              className={`absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer`}
            >
              &#8592;
            </ScrollButton>
            <ScrollButton
              canScroll={canScrollRight}
              onClick={() =>
                sliderRef.current.scrollBy({
                  left: 300,
                  behavior: "smooth",
                })
              }
              className={`absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer`}
            >
              &#8594;
            </ScrollButton>
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
