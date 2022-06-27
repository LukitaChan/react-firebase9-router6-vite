import React, { useContext, useState } from "react";
import { UserContext } from "../context/UseProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("galleta1@test.com");
  const [password, setPassword] = useState("Galleta12");

  const navegate = useNavigate();

  const { registerUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Procesando formulario: ", email, password);

    try {
      await registerUser(email, password);
      console.log("Usuario creado (0w0)");
      navegate("/");
    } catch (error) {
      console.log(error.code);
      //alert("Este email ya esta en uso");
    }
  };

  return (
    <>
      <h1>Register</h1>
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
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Register;
