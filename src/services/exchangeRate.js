const API_URI =
  import.meta.env.VITE_API_URI || "https://ecommerce-api-7pf6.onrender.com";

export const getExchangeRate = async () => {
  try {
    const response = await fetch(`${API_URI}/api/scraped-values/today`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
