export const formValidate = () => {
  return {
    required: {
      value: true,
      message: "Campo Obligatorio",
    },
    patternEmail: {
      value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9]+(\.[a-z0-9]+)*(\.[a-z]{2,15})/,
      message: " Formato email incorrecto",
    },
    patternURL: {
      value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
      message: " Formato url incorrecto",
    },
    minLength: {
      value: 6,
      message: "Minimo 6 caracteres",
    },
    validateTrim: {
      trim: (v) => {
        if (!v.trim()) {
          return "Escriba algo por favor";
        }
        return true;
      },
    },
    validateEquals(value) {
      return {
        equals: (v) => v === value || "La contraseña no coincide",
      };
    },
  };
};
