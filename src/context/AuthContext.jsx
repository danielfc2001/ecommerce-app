import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuth: false,
    user: null,
    userId: null,
  });
  const [createUserError, setCreateUserError] = useState(null);
  const [createUserSuccess, setCreateUserSuccess] = useState(null);
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const navigate = useNavigate();

  const createUser = async (data) => {
    try {
      setCreateUserLoading(true);
      const response = await fetch("http://127.0.0.1:3000/api/auth/register", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("Response:", response);
      if (!response.ok)
        throw { message: "A ocurrido un error al crear el usuario." };
      const result = await response.json();
      if (result) setCreateUserSuccess(result.message);
      setCreateUserError(null);
    } catch (error) {
      console.error("Error creating user:", error);
      setCreateUserSuccess(null);
      setCreateUserError(
        error.message || "A ocurrido un error al crear el usuario."
      );
    } finally {
      setCreateUserLoading(false);
    }
  };

  const handleLogin = async (data) => {
    try {
      setCreateUserLoading(true);
      const response = await fetch("http://127.0.0.1:3000/api/auth/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        throw { message: "A ocurrido un error al iniciar sesión." };

      const result = await response.json();
      if (result) {
        setUser({
          isAuth: true,
          user: result.user.email,
          userId: result.user.userId,
        });
        setCreateUserError(null);
        setCreateUserSuccess(result.message);
        localStorage.setItem("auth-token", result.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setCreateUserError(error.message);
    } finally {
      setCreateUserLoading(false);
    }
  };

  const verifyUser = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) return navigate("/");
      const response = await fetch("http://127.0.0.1:3000/api/auth/verify", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "x-access-token": token,
        },
      });
      if (!response.ok) {
        localStorage.removeItem("auth-token");
        return navigate("/");
      }
      const result = await response.json();
      setUser({
        isAuth: true,
        user: result.user.email,
        userId: result.user.id,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = () => {
    localStorage.removeItem("auth-token");
    setUser({ isAuth: false, user: null, userId: null });
    navigate("/");
  };

  useEffect(() => {
    verifyUser();
  }, []);

  // Limpia los mensajes de error y éxito después de 5 segundos
  useEffect(() => {
    if (createUserError || createUserSuccess) {
      const timer = setTimeout(() => {
        setCreateUserError(null);
        setCreateUserSuccess(null);
      }, 5000); // 5 segundos

      // Limpia el temporizador si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, [createUserError, createUserSuccess]);

  return (
    <AuthContext.Provider
      value={{
        user,
        createUserError,
        createUserSuccess,
        createUserLoading,
        createUser,
        handleLogin,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
