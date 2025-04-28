import useProducts from "../hooks/useProducts";
import SpinnerIcon from "./icons/SpinnerIcon";
import TrashIcon from "./icons/TrashIcon";

const ProductCard = ({
  id,
  name,
  price,
  img,
  stock,
  isOffer,
  discount,
  category,
  currency,
  dispatchEvent,
  view,
  width,
}) => {
  const { pending, deleteProduct } = useProducts();
  const finalPrice = isOffer
    ? (price - (price * discount) / 100).toFixed(2)
    : price;
  return (
    <article
      className={`flex flex-col bg-white dark:bg-gray-800 shadow-sm border border-slate-200 dark:border-gray-700 rounded-lg`}
    >
      {/* Imagen del producto */}
      <div
        className={`${
          `w-` + width
        } relative h-64 overflow-hidden rounded-t-lg bg-clip-border `}
      >
        <img
          src={img || `/images/image-not-found.png`}
          alt={name}
          className="h-full w-full object-cover rounded-md"
        />
        {isOffer && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Detalles del producto */}
      <div className={`flex flex-col justify-between px-3 py-2`}>
        <div className="flex flex-col items-center justify-between mb-2 ">
          <p className=" text-slate-800 dark:text-gray-200 text-lg font-semibold">
            {name}
          </p>
          {/* Categoría */}
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </p>
          <div className="flex flex-col text-end w-full">
            <p className="text-cyan-500 dark:text-cyan-400 text-sm line-through font-light">
              ${price}
            </p>
            <p className="text-cyan-600 dark:text-cyan-300 text-md font-semibold">
              ${finalPrice}
              <span className="ml-1">{currency}</span>
            </p>
          </div>
        </div>

        {/* Stock */}
        {stock && (
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Stock:</p>
            <p
              className={`text-sm font-semibold ${
                stock > 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {stock > 0 ? `${stock} available` : "Out of stock"}
            </p>
          </div>
        )}

        {/* Botón de detalles */}
        {dispatchEvent === "button" && (
          <button
            className="rounded-md w-full mt-2 bg-cyan-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
            type="button"
            disabled={stock === 0}
          >
            Detalles
          </button>
        )}
        {view === "provider" && (
          <button
            className="flex flex-row items-center justify-center rounded-md w-full mt-2 bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
            type="button"
            disabled={stock === 0}
            onClick={() => {
              if (
                window.confirm(
                  "¿Estás seguro de que quieres eliminar este producto?"
                )
              ) {
                deleteProduct(id);
              }
            }}
          >
            {pending ? (
              <>
                <SpinnerIcon width={16} height={16} />
                Eliminando
              </>
            ) : (
              <>
                <TrashIcon width={16} height={16} />
                Eliminar
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
