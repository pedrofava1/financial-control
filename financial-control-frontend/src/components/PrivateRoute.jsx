import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("Token não encontrado! Redirecionando para /login");
    return <Navigate to="/login" />;
  }

  console.log("Token encontrado! Acesso autorizado.");
  return <Outlet />;
};

export default PrivateRoute;
