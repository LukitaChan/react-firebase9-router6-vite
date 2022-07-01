import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UseProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormImput from "../components/FormImput";

const Register = () => {
  // const [email, setEmail] = useState("galleta1@test.com");
  // const [password, setPassword] = useState("Galleta12");

  const navegate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    getValues,
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
      await registerUser(email, password);
      //console.log("Usuario creado (0w0)");
      navegate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: erroresFirebase(error.code),
      });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Procesando formulario: ", email, password);

  //   try {
  //     await registerUser(email, password);
  //     console.log("Usuario creado (0w0)");
  //     navegate("/");
  //   } catch (error) {
  //     console.log(error.code);
  //     //alert("Este email ya esta en uso");
  //   }
  // };

  return (
    <>
      <h1>Register</h1>
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

        <FormImput
          type="password"
          placeholder="Ingrese password"
          {...register("repassword", {
            setValues: (v) => v.trim(),
            validate: validateEquals(getValues),
          })}
        >
          <FormError error={errors.repassword} />
        </FormImput>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
