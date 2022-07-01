import React, { forwardRef, useRef } from "react";

/* El reenvío de refs 'forwardRef' es una técnica para pasar automáticamente una ref a través de un componente a uno de sus hijos. Esto normalmente no es necesario para la mayoría de los componentes. Sin embargo, puede ser útil para ciertos tipos de componentes, especialmente en bibliotecas de componentes reutilizables. */
//En este caso estamos pasando una ref 'inputFocus' a un componente hijo 'InputText' y como no podemos usarla como prop aplicamos el 'forwardRef' que recibe tanto las props como las ref.

const InputText = forwardRef((props, ref) => {
  return (
    <>
      <input type="text" ref={ref}></input>
    </>
  );
});

/* useRef devuelve un objeto ref mutable cuya propiedad .current se inicializa con el argumento pasado (initialValue). El objeto devuelto se mantendrá persistente durante la vida completa del componente.
Un caso de uso común es para acceder a un hijo imperativamente.
Accedemos a los elementos del DOM */

const ExampleRef = () => {
  const inputFocus = useRef(null);

  const handleButtonClick = () => {
    console.log("Me clickeaste");
    inputFocus.current.focus();
  };

  return (
    <>
      <InputText ref={inputFocus} />
      <button onClick={handleButtonClick}>Click ref</button>
    </>
  );
};

export default ExampleRef;
