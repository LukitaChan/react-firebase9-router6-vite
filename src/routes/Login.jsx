import React, { useContext } from "react";
import { UserContext } from "../context/UseProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navegate = useNavigate();

  const handleClickLogin = () => {
    setUser(true);
    navegate("/");
  };

  return (
    <>
      <h1>Login</h1>
      <h2>{user ? "Online" : "Offline"}</h2>
      <button onClick={handleClickLogin}>Acceder</button>
    </>
  );
};

export default Login;
