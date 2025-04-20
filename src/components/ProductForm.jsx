import { useForm } from "react-hook-form";
import useProducts from "../hooks/useProducts";
import FormInput from "./FormInput";
import FormMessage from "./FormMessage";
import { useState, useRef } from "react";
import SubmitBtn from "./SubmitBtn";

const category = [
  "alimentos",
  "ropa",
  "electrodomesticos",
  "vehiculos",
  "vivienda",
  "deporte",
];

const ProductForm = () => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [acceptCup, setAcceptCup] = useState(false);
  const { pending, message, createNewProduct } = useProducts();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const onSubmit = (data) => {
    console.log(data);
    const requestSuccess = createNewProduct(data);
    if (requestSuccess) {
      reset();
      setImagePreview(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
    /*     if (fileInputRef.current) {
      console.log(fileInputRef);
      fileInputRef.current.click(); // Asegúrate de que el input esté correctamente referenciado
    } */
  };

  // Watch the isOffer field to conditionally show discount input
  const isOffer = watch("isOffer");

  return (
    <>
      <form
        className="w-full flex flex-col justify-center align-middle gap-3 p-3 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-200"
        id="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-bold text-3xl">Crear nuevo producto:</h2>

        {/* Nombre del producto */}
        <FormInput
          type="text"
          placeholder="Nombre del producto"
          register={{
            ...register("name", {
              required: "El nombre del producto es requerido",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
            }),
          }}
          errors={errors.name}
        />
        {errors.name && (
          <FormMessage type="error">{errors.name.message}</FormMessage>
        )}

        {/* Descripción */}
        <FormInput
          type="text"
          placeholder="Descripción"
          register={{
            ...register("description", {
              required: "La descripción es requerida",
              minLength: {
                value: 10,
                message: "La descripción debe tener al menos 10 caracteres",
              },
            }),
          }}
          errors={errors.description}
        />
        {errors.description && (
          <FormMessage type="error">{errors.description.message}</FormMessage>
        )}

        {/* Precio */}
        <FormInput
          type="number"
          placeholder="Precio"
          register={{
            ...register("price", {
              required: "El precio es requerido",
              min: {
                value: 0.01,
                message: "El precio debe ser mayor a 0",
              },
            }),
          }}
          errors={errors.price}
        />
        {errors.price && (
          <FormMessage type="error">{errors.price.message}</FormMessage>
        )}

        <div className="w-full">
          <select
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            {...register("currency", {
              required: "La moneda de pago es requerida",
            })}
            onChange={(e) => {
              if (e.target.value === "USD") setAcceptCup(true);
              else setAcceptCup(false);
            }}
          >
            <option value="">Selecciona una moneda</option>
            <option value="USD">USD</option>
            <option value="CUP">CUP</option>
            <option value="MLC">MLC</option>
          </select>
        </div>
        {acceptCup && (
          <div className="flex flex-row items-center">
            <input
              type="checkbox"
              id="acceptCup"
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              {...register("acceptCup")}
            />
            <label className="mx-3">Desea aceptar CUP al cambio actual?</label>
          </div>
        )}

        {/* Stock */}

        <FormInput
          type="number"
          placeholder="Stock"
          register={{
            ...register("stock", {
              required: "El stock es requerido",
              min: {
                value: 0,
                message: "El stock debe ser mayor a 0",
              },
            }),
          }}
          errors={errors.stock}
        />
        {errors.stock && (
          <FormMessage type="error">{errors.stock.message}</FormMessage>
        )}

        {/* Imagen */}
        <div
          className="p-3 border-2 border-dashed rounded-lg dark:border-gray-600 cursor-pointer"
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
          onClick={handleClick}
        >
          <label className="block text-gray-700 dark:text-gray-300">
            Imagen del producto
          </label>
          <input
            type="file"
            accept="image/*"
            id="imageInput"
            className="hidden"
            ref={fileInputRef}
            {...register("image", {
              onChange: handleImageChange,
            })}
          />
          <div className="flex flex-col items-center justify-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Arrastra una imagen aquí o haz clic para seleccionarla
              </p>
            )}
          </div>
        </div>
        {errors.image && (
          <FormMessage type="error">{errors.image.message}</FormMessage>
        )}

        {/* Categoría */}
        <div className="w-full">
          <select
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            {...register("category", {
              required: "La categoría es requerida",
            })}
          >
            <option value="">Selecciona una categoría</option>
            {category.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && (
            <FormMessage type="error">{errors.category.message}</FormMessage>
          )}
        </div>

        {/* Oferta */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isOffer"
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            {...register("isOffer")}
          />
          <label htmlFor="isOffer" className="text-gray-700 dark:text-gray-300">
            ¿Está en oferta?
          </label>
        </div>

        {/* Porcentaje de descuento (condicional) */}
        {isOffer && (
          <div>
            <FormInput
              type="number"
              placeholder="Porcentaje de descuento"
              register={{
                ...register("offerDiscount", {
                  required: "El porcentaje de descuento es requerido",
                  min: {
                    value: 1,
                    message: "El descuento debe ser al menos 1%",
                  },
                  max: {
                    value: 99,
                    message: "El descuento no puede ser mayor a 99%",
                  },
                }),
              }}
              errors={errors.offerDiscount}
            />
            {errors.offerDiscount && (
              <FormMessage type="error">
                {errors.offerDiscount.message}
              </FormMessage>
            )}
          </div>
        )}

        {/* Botón de envío */}
        <SubmitBtn isLoading={pending}>Crear Producto</SubmitBtn>
        {message.type && (
          <FormMessage type={message.type}>{message.message}</FormMessage>
        )}
      </form>
    </>
  );
};

export default ProductForm;
