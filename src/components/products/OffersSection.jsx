import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getGlobalOfferProducts } from "../../services/products";
import ProductCard from "../ProductCard";
import CardLoader from "../ui/CardLoader";
import Message from "../ui/Message";
import Flicking from "@egjs/react-flicking";

const OffersSection = ({ category }) => {
  const { isError, isPending, error, data } = useQuery({
    queryKey: ["offerProducts", category],
    queryFn: () => getGlobalOfferProducts(category),
    placeholderData: keepPreviousData,
  });
  return (
    <section className="w-full rounded-lg mt-5 p-2">
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
        <Flicking
          viewportTag="div"
          cameraTag="div"
          cameraClass="flex gap-4"
          align="prev"
          horizontal={true}
          bound={true}
        >
          {data.products?.map((product, i) => (
            <article key={i} className="w-60 h-full shrink-0">
              <ProductCard
                key={i}
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
                className={`flicking-panel`}
              />
            </article>
          ))}
        </Flicking>
      )}
    </section>
  );
};

export default OffersSection;
