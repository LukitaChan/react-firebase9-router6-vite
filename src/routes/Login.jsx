import React, { useContext, useState } from "react";
import { UserContext } from "../context/UseProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("galleta1@test.com");
  const [password, setPassword] = useState("Galleta12");

  const { loginUser } = useContext(UserContext);
  const navegate = useNavigate();

  // const handleClickLogin = () => {
  //   setUser(true);
  //   navegate("/");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Procesando formulario: ", email, password);

    try {
      await loginUser(email, password);
      console.log("Usuario logueado (=w=)");
      navegate("/");
    } catch (error) {
      console.log(error.code);
      //alert("Este email ya esta en uso");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingrese password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {/* <h2>{user ? "Online" : "Offline"}</h2>
      <button onClick={handleClickLogin}>Acceder</button> */}
    </>
  );
};

export default Login;
