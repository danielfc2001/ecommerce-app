const API_URI =
  import.meta.env.VITE_API_URI || "https://ecommerce-api-7pf6.onrender.com";

export const getGlobalOfferProducts = (category) => {
  return fetch(`${API_URI}/api/gproducts/offers?category=${category}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          response.statusText ||
            "A ocurrido un error al obtener los productos de oferta."
        );
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(
        error.message ||
          "A ocurrido un error al recuperar los productos en oferta."
      );
    });
};

export const getGlobalProducts = (page, category) => {
  return fetch(`${API_URI}/api/gproducts/?page=${page}&category=${category}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          response.statusText || "A ocurrido un error al obtener los productos."
        );
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(
        error.message || "A ocurrido un error al recuperar los productos."
      );
    });
};
