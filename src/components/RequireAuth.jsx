import React, { useContext } from "react";
import { UserContext } from "../context/UseProvider";
import { Navigate } from "react-router-dom";

//Children es el resto de los componentes o lo que se renderizara despues.
const RequireAuth = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
