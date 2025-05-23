import { createContext, useEffect, useState } from "react";
import { getExchangeRate } from "../services/exchangeRate";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [exchange, setExchange] = useState(null);
  const [isExchangeLoading, setIsExchangeLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    // Configurar el tema inicial basado en el sistema o preferencia previa
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
    if (isDark) {
      document.getElementById("root").classList.add("dark");
    } else {
      document.getElementById("root").classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    setIsExchangeLoading(true);
    getExchangeRate()
      .then((data) => {
        if (data) {
          setExchange(data.value);
        }
      })
      .finally(() => setIsExchangeLoading(false));
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    const root = document.getElementById("root");
    if (theme === "light") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider
      value={{ exchange, isExchangeLoading, theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
