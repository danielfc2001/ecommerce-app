const API_URI =
  import.meta.env.VITE_API_URI || "https://ecommerce-api-7pf6.onrender.com";

export const getGlobalProducts = () => {};

export const getGlobalOfferProducts = () => {
  return fetch(`${API_URI}/api/gproducts/offers`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
