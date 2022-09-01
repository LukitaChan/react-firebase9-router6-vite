import React, { useContext, useState } from "react";

import { UserContext } from "../context/UseProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormImput from "../components/FormImput";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () => {
  //const [email, setEmail] = useState("galleta1@test.com");
  //const [password, setPassword] = useState("Galleta12");

  const { loginUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await loginUser(email, password);
      //console.log("Usuario creado (0w0)");
      navegate("/");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message: message });
    } finally {
      setLoading(false);
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
      <Title text="Login" />
      {/*  <FormError error={errors.firebase} /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormImput
          label="Ingresa tu email"
          type="email"
          placeholder="test2022@test.com"
          {...register("email", {
            required: required,
            pattern: patternEmail,
          })}
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormImput>

        <FormImput
          label="Ingresa tu password"
          type="password"
          placeholder="123456"
          {...register("password", {
            setValues: (v) => v.trim(),
            minLength: minLength,
            validate: validateTrim,
          })}
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormImput>

        <Button text="Login" type="submit" loading={loading} color="purple" />
      </form>
      {/* <h2>{user ? "Online" : "Offline"}</h2>
      <button onClick={handleClickLogin}>Acceder</button> */}
    </>
  );
};

export default Login;
