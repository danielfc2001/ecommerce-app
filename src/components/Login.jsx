import { useForm } from "react-hook-form";
import FormContainer from "./ui/FormContainer";
import FormInput from "./FormInput";
import { useEffect, useState } from "react";
import PasswordVisibilityIcon from "./icons/PasswordVisibilityIcon";
import { useAuth } from "../hooks/useAuth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FormMessage from "./FormMessage";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    user,
    createUserError,
    createUserSuccess,
    createUserLoading,
    handleLogin,
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handleLogin({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (user.isAuth) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <FormContainer>
      <h2 className=" text-2xl font-sans dark:text-white">Iniciar Sesión:</h2>
      <form
        className="w-full flex flex-col justify-center items-center mt-5 gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          type={"email"}
          placeholder={"Correo Electronico"}
          register={{
            ...register("email", {
              required: "Este campo es requerido",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Correo electronico invalido",
              },
            }),
          }}
          errors={errors.email}
        />
        {errors.email && (
          <FormMessage type="error">{errors.email.message}</FormMessage>
        )}
        <div className="w-full relative">
          <FormInput
            type={showPassword ? "text" : "password"}
            placeholder={"Contraseña"}
            register={{
              ...register("password", {
                required: "Este campo es requerido",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              }),
            }}
            errors={errors.password}
          />
          <PasswordVisibilityIcon
            isVisible={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {errors.password && (
          <FormMessage type="error">{errors.password.message}</FormMessage>
        )}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out"
          disabled={createUserLoading}
        >
          {createUserLoading ? "Cargando..." : "Acceder"}
        </button>
        {createUserError && (
          <FormMessage type="error">{createUserError}</FormMessage>
        )}
        {createUserSuccess && (
          <FormMessage type="success">{createUserSuccess}</FormMessage>
        )}
        <p className="text-sm mt-2 dark:text-white">
          No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Registrate
          </Link>
        </p>
      </form>
    </FormContainer>
  );
};

export default Login;
