import { useForm } from "react-hook-form";
import FormMessage from "./FormMessage";
import PasswordVisibilityIcon from "./icons/PasswordVisibilityIcon";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import FormInput from "./FormInput";
import FormContainer from "./ui/FormContainer";
import SpinnerIcon from "./icons/SpinnerIcon";
import Turnstile from "./cloudflare/Turnstile";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const {
    user,
    createUserError,
    createUserSuccess,
    createUserLoading,
    createUser,
  } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [captchaError, setCaptchaError] = useState(null);

  const onSubmit = (data) => {
    if (!captchaToken) {
      setCaptchaError("Debe completar el CAPTCHA para continuar.");
      return;
    }
    setCaptchaError(null);
    // Aquí puedes manejar la lógica de registro, como enviar los datos a una API
    createUser({
      username: data.username,
      email: data.email,
      password: data.password,
      captcha: captchaToken,
    });
  };

  const handleCaptchaSuccess = useCallback((token) => {
    setCaptchaToken(token);
  }, []);

  const handleCaptchaError = useCallback(() => {
    setCaptchaToken(null);
  }, []);

  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken(null);
  }, []);

  useEffect(() => {
    if (user.isAuth) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <FormContainer>
      <h2 className=" text-2xl font-sans dark:text-white">
        Registra una cuenta:
      </h2>
      <form
        className="w-full flex flex-col justify-center items-center mt-5 gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          type={"text"}
          placeholder={"Nombre de usuario"}
          register={{
            ...register("username", {
              required: "Este campo es requerido",
              minLength: {
                value: 3,
                message:
                  "El nombre de usuario debe tener al menos 3 caracteres",
              },
            }),
          }}
          errors={errors.username}
        />
        {errors.username && (
          <FormMessage type="error">{errors.username.message}</FormMessage>
        )}
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
        <div className="w-full relative">
          <FormInput
            type={showConfirmPassword ? "text" : "password"}
            placeholder={"Confirmar Contraseña"}
            register={{
              ...register("confirmPassword", {
                required: "Este campo es requerido",
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              }),
            }}
            errors={errors.confirmPassword}
          />
          {/* Campo de Confirmar Contraseña */}
          <PasswordVisibilityIcon
            isVisible={showConfirmPassword}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>
        {errors.confirmPassword && (
          <FormMessage type="error">
            {errors.confirmPassword.message}
          </FormMessage>
        )}
        <FormInput
          type={"text"}
          placeholder={"Nombre de marca (Opcional)"}
          register={{
            ...register("brand", {
              minLength: {
                value: 2,
                message:
                  "Su nombre de marca debe contener al menos 2 caracteres",
              },
            }),
          }}
          errors={errors.brand}
        />
        {errors.brand && (
          <FormMessage type={"error"}>{errors.brand.message}</FormMessage>
        )}
        <Turnstile
          siteKey="0x4AAAAAABLSz-YpHRGJq0Ji"
          onSuccess={handleCaptchaSuccess}
          onError={handleCaptchaError}
          onExpire={handleCaptchaExpire}
        />
        {captchaError && <FormMessage type="error">{captchaError}</FormMessage>}
        <div className="w-full flex items-center justify-center mt-2">
          <input
            type="checkbox"
            {...register("terms", {
              required: "Debe marcar este campo para completar el registro.",
            })}
            className="dark:bg-gray-800 dark:text-white"
          />
          <label className="ml-2 dark:text-white">
            Acepto los terminos y condiciones
          </label>
        </div>
        {errors.terms && (
          <FormMessage type="error">{errors.terms.message}</FormMessage>
        )}
        <button
          className="w-full flex flex-row justify-center items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 ease-in-out cursor-pointer"
          disabled={createUserLoading}
        >
          {createUserLoading ? (
            <>
              <SpinnerIcon /> <span>Cargando...</span>
            </>
          ) : (
            "Crear Cuenta"
          )}
        </button>
        {createUserError && (
          <FormMessage type="error">{createUserError}</FormMessage>
        )}
        {createUserSuccess && (
          <FormMessage type="success">{createUserSuccess}</FormMessage>
        )}

        <p className="text-sm mt-2 dark:text-white">
          Ya tienes una cuenta?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Inicia Sesion
          </Link>
        </p>
      </form>
    </FormContainer>
  );
};

export default Register;
