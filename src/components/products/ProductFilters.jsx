import { category } from "../../utils/categories";

const ProductFilters = ({ register, errors }) => {
  return (
    <>
      <select
        className="w-full flex justify-between items-center pl-4 pr-10 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
        {...register("category", {
          required: "La categoría es requerida",
        })}
      >
        <option value={"all"}>Todas las categorias</option>
        {category.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
      {errors.category && (
        <FormMessage type="error">{errors.category.message}</FormMessage>
      )}
    </>
  );
};

export default ProductFilters;
