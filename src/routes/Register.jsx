import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UseProvider";

const Register = () => {
  // const [email, setEmail] = useState("galleta1@test.com");
  // const [password, setPassword] = useState("Galleta12");

  const navegate = useNavigate();
  const { registerUser } = useContext(UserContext);

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
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      console.log("Usuario creado (0w0)");
      navegate("/");
    } catch (error) {
      console.log(error.code);
      // if (error.code === "auth/email-already-in-use") {
      //   console.log("Usuario ya registrado");
      // }
      switch (error.code) {
        case "auth/email-already-in-use":
          //console.log("Usuario ya registrado");
          setError("email", {
            message: "Usuario ya registrado",
          });
          break;
        case "auth/invalid-email":
          setError("email", {
            message: "Formato email no valido",
          });
          break;
        default:
          console.log("Ocurrio un error");
      }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required: {
              value: true,
              message: "Campo Obligatorio",
            },
            pattern: {
              value:
                /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9]+(\.[a-z0-9]+)*(\.[a-z]{2,15})/,
              message: " Formato email incorrecto",
            },
          })}
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            setValues: (v) => v.trim(),
            minLength: {
              value: 6,
              message: "Minimo 6 caracteres",
            },
            validate: {
              trim: (v) => {
                if (!v.trim()) {
                  return "Escriba algo por favor";
                }
                return true;
              },
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          type="password"
          placeholder="Ingrese password"
          {...register("repassword", {
            setValues: (v) => v.trim(),
            validate: {
              equals: (v) =>
                v === getValues("password") || "La contraseña no coincide",
              //message: "La contraseña no coincide",
            },
          })}
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
        />
        {errors.repassword && <span>{errors.repassword.message}</span>}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
