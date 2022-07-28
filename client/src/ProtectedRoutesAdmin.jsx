import { useContext } from "react";
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./App";

const useAuth = () => {
  const { admin } = useContext(UserContext);
  return admin && admin.loggedIn;
};

export default function ProtectedRoutesAdmin () {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}