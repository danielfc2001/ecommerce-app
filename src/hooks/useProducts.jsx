import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URI =
  import.meta.env.VITE_API_URI || "https://ecommerce-api-7pf6.onrender.com";

const useProducts = () => {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState({
    message: null,
    type: null,
  });
  const [products, setProducts] = useState([]);

  const getUserProducts = async () => {
    try {
      setPending(true);
      console.log(API_URI);
      const response = await fetch(`${API_URI}/api/products/user`, {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem("auth-token"),
        },
      });
      if (!response.ok)
        throw {
          message:
            "A ocurrido un error al recuperar los productos del usuario. Vuelva a intentarlo...",
        };
      const data = await response.json();
      setProducts(data.products);
      console.log(data.products);
      setMessage({
        message: "Productos recuperados correctamente",
        type: "success",
      });
    } catch (error) {
      console.log(error);
      setMessage({
        message: error.message,
        type: "error",
      });
    } finally {
      setPending(false);
    }
  };

  const createNewProduct = async (data) => {
    try {
      setPending(true);

      // Create a FormData object to handle file uploads
      const formData = new FormData();

      // Append all form fields to the FormData object
      Object.keys(data).forEach((key) => {
        if (key === "image" && data[key][0]) {
          // For file inputs, append the file object
          formData.append("image", data[key][0]);
        } else {
          // For other inputs, append the value
          formData.append(key, data[key]);
        }
      });

      const response = await fetch(`${API_URI}/api/products/create`, {
        method: "POST",
        body: formData, // Send the FormData object
        headers: {
          "x-access-token": localStorage.getItem("auth-token"),
          // Don't set Content-Type header - the browser will set it automatically with the boundary
        },
      });

      if (!response.ok)
        throw {
          message:
            "A ocurrido un error al crear el producto. Vuelva a intentarlo.",
        };
      const responseData = await response.json();
      setMessage({
        message: responseData.message,
        type: "success",
      });
      if (responseData) return true;
    } catch (err) {
      console.log(err);
      setMessage({
        message: err.message,
        type: "error",
      });
      return false;
    } finally {
      setPending(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setPending(true);
      const response = await fetch(`${API_URI}/api/products/delete/${id}`, {
        method: "DELETE",
        headers: {
          "x-access-token": localStorage.getItem("auth-token"),
        },
      });
      if (!response.ok)
        throw {
          message:
            "A ocurrido un error al eliminar el producto. Vuelva a intentarlo.",
        };
      toast.success("Se a eliminado el producto correctamente.");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setPending(false);
      const newProducts = products.filter((product) => product._id !== id);
      setProducts(newProducts);
    }
  };

  useEffect(() => {
    if (message.message) {
      const timeout = setTimeout(() => {
        setMessage({
          message: null,
          type: null,
        });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [message]);
  return {
    pending,
    message,
    products,
    getUserProducts,
    createNewProduct,
    deleteProduct,
  };
};

export default useProducts;
