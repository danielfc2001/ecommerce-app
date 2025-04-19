import { useQuery } from "@tanstack/react-query";
import DashboardSearchBar from "../components/DashboardSearchBar";
import { getGlobalOfferProducts } from "../services/products";
import ProductCard from "../components/ProductCard";
import { useRef, useState, useEffect } from "react";

const Products = () => {
  const { isError, isPending, error, data } = useQuery({
    queryKey: ["offerProducts"],
    queryFn: getGlobalOfferProducts,
  });

  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (sliderRef.current) {
      const { scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(sliderRef.current.scrollLeft > 0);
      setCanScrollRight(scrollWidth > clientWidth);
    }
  }, [data]);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  return (
    <div className="w-full dark:bg-gray-900 p-5 pt-10">
      <DashboardSearchBar className={`w-3/4 mx-auto`} />
      <section className="w-full mt-5">
        <h2 className="text-3xl text-gray-900 dark:text-white mb-2">
          Ofertas del día:
        </h2>

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
                <div
                  key={product._id}
                  className="flex-shrink-0 w-64" // Tamaño reducido de las tarjetas
                >
                  <ProductCard
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    img={product.image}
                    isOffer={product.isOffer}
                    stock={product.stock}
                    discount={product.offerDiscount}
                    category={product.category}
                  />
                </div>
              ))}
            </div>

            {/* Controladores del slider */}
            <button
              className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition ${
                !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() =>
                sliderRef.current.scrollBy({
                  left: -300,
                  behavior: "smooth",
                })
              }
              disabled={!canScrollLeft}
            >
              &#8592;
            </button>
            <button
              className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition ${
                !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() =>
                sliderRef.current.scrollBy({
                  left: 300,
                  behavior: "smooth",
                })
              }
              disabled={!canScrollRight}
            >
              &#8594;
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
