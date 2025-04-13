import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user.isAuth) {
    return children;
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
};

export default ProtectedRoute;
