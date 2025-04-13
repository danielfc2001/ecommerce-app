import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <section className="w-full h-dvh flex flex-col justify-center items-center dark:bg-gray-900">
      <Outlet />
    </section>
  );
};

export default Auth;
