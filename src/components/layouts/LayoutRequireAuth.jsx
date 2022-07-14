import React, { useContext } from "react";
import { UserContext } from "../../context/UseProvider";
import { Navigate, Outlet } from "react-router-dom";

//Children es el resto de los componentes o lo que se renderizara despues. Outlet renderiza tambien el children.
const LayoutRequireAuth = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
};

export default LayoutRequireAuth;
