import React, { useContext } from "react";

import { UserContext } from "../context/UseProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormImput from "../components/FormImput";

const Login = () => {
  //const [email, setEmail] = useState("galleta1@test.com");
  //const [password, setPassword] = useState("Galleta12");

  const { loginUser } = useContext(UserContext);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "galleta1@test.com",
      password: "Galleta12",
      repassword: "Galleta12",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await loginUser(email, password);
      //console.log("Usuario creado (0w0)");
      navegate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: erroresFirebase(error.code),
      });
    }
  };

  // try {
  //   await loginUser(email, password);
  //   console.log("Usuario logueado (=w=)");
  //   navegate("/");
  // } catch (error) {
  //   console.log(error.code);
  //   //alert("Este email ya esta en uso");
  // }

  return (
    <>
      <h1>Login</h1>
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormImput
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required: required,
            pattern: patternEmail,
          })}
        >
          <FormError error={errors.email} />
        </FormImput>

        <FormImput
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            setValues: (v) => v.trim(),
            minLength: minLength,
            validate: validateTrim,
          })}
        >
          <FormError error={errors.password} />
        </FormImput>

        <button type="submit">Register</button>
      </form>
      {/* <h2>{user ? "Online" : "Offline"}</h2>
      <button onClick={handleClickLogin}>Acceder</button> */}
    </>
  );
};

export default Login;
