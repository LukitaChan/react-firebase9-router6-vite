import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UseProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormImput from "../components/FormImput";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";

const Register = () => {
  // const [email, setEmail] = useState("galleta1@test.com");
  // const [password, setPassword] = useState("Galleta12");

  const navegate = useNavigate();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await registerUser(email, password);
      //console.log("Usuario creado (0w0)");
      navegate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message: message });
    } finally {
      setLoading(false);
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
      <Title text="Register" />
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormImput
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required: required,
            pattern: patternEmail,
          })}
          label="Ingresa tu email"
          error={errors.email}
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
          label="Ingrese password"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormImput>

        <FormImput
          type="password"
          placeholder="Ingrese password"
          {...register("repassword", {
            setValues: (v) => v.trim(),
            validate: validateEquals(getValues("password")),
          })}
          label="Reingrese password"
          error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormImput>

        <Button text="Register" type="submit" loading={loading} />
      </form>
    </>
  );
};

export default Register;
