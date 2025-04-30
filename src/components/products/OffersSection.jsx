import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getGlobalOfferProducts } from "../../services/products";
import useProductsScroll from "../../hooks/useProductsScroll";
import { useEffect } from "react";
import ProductCard from "../ProductCard";
import ScrollButton from "./ScrollButton";
import CardLoader from "../ui/CardLoader";
import Message from "../ui/Message";

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
    setScrollRef();
  }, [data]);
  return (
    <section className="w-full rounded-lg mt-5 p-2">
      <h1 className="text-2xl text-center font-semibold dark:text-white">
        Products Offers
      </h1>
      {/* Mensajes de carga o error */}
      {isPending && (
        <div className="relative">
          <div className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth py-3">
            <CardLoader count={3} />
          </div>
        </div>
      )}
      {isError && <Message type={"error"}>{error.message}</Message>}

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
                alterCurrency={product.alterCurrency}
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
