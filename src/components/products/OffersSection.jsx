import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getGlobalOfferProducts } from "../../services/products";
import useProductsScroll from "../../hooks/useProductsScroll";
import { useEffect } from "react";
import ProductCard from "../ProductCard";
import ScrollButton from "./ScrollButton";

const OffersSection = ({ category }) => {
  const { isError, isPending, error, data } = useQuery({
    queryKey: ["offerProducts", category],
    queryFn: () => getGlobalOfferProducts(category),
    placeholderData: keepPreviousData,
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
            className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth py-3"
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
                dispatchEvent={"button"}
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
  );
};

export default OffersSection;
