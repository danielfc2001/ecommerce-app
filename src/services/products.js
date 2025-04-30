const API_URI =
  import.meta.env.VITE_API_URI || "https://ecommerce-api-7pf6.onrender.com";

export const getGlobalOfferProducts = (category) => {
  return fetch(`${API_URI}/api/gproducts/offers?category=${category}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const getGlobalProducts = (page, category) => {
  return fetch(`${API_URI}/api/gproducts/?page=${page}&category=${category}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
