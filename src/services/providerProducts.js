const API_URI =
  import.meta.env.VITE_API_URI || "https://ecommerce-api-7pf6.onrender.com";

export const getProviderProducts = () => {
  return fetch(`${API_URI}/api/products/user`, {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("auth-token"),
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error("Error al cargar los productos. Vuelva a intentarlo.");
      return response.json();
    })
    .then((data) => {
      return data;
    });
};
