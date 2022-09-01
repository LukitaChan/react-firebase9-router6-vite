import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "../hooks/useFirestore";

import { formValidate } from "../utils/formValidate";
import { erroresFirebase } from "../utils/erroresFirebase";

import Button from "../components/Button";
import Title from "../components/Title";
import FormError from "../components/FormError";
import FormImput from "../components/FormImput";

const Home = () => {
  const [copy, setCopy] = useState({});
  const { required, patternURL } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setError,
    setValue,
  } = useForm();

  const { loading, data, error, getData, addData, deleteData, updateData } =
    useFirestore();
  //const [text, setText] = useState("");
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    //console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data getData...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      //e.preventDefault();
      if (newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID("");
        //setText("");
        //return;
      } else {
        await addData(url);
      }
      resetField(url);
      //setText("");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message: message });
    }
    //console.log(url);
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = (item) => {
    //setText(item.origin);
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };

  const pathURL = window.location.href;

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid);

    //console.log("url copiada");

    setCopy((prev) => ({ [nanoid]: true }));
  };

  return (
    <>

      <Title text="Bienvenido al Administrador de URLs" />


      <form onSubmit={handleSubmit(onSubmit)}>
        <FormImput
          label="Ingresa URL"
          type="text"

          placeholder="https://github.com/LukitaChan"

          {...register("url", {
            required: required,
            pattern: patternURL,
          })}
          error={errors.url}
        >
          <FormError error={errors.url} />
        </FormImput>

        {/* <input
          placeholder="https://www.instagram.com"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        /> */}

        {newOriginID ? (
          <Button
            type="submit"
            text="Edit Url"
            color="blue"
            loading={loading.updateData}
          />
        ) : (
          <Button
            type="submit"
            text="Add Url"
            color="blue"
            loading={loading.addData}
          />
        )}
      </form>

      {data.map((item) => (
        <div
          key={item.nanoid}
          className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-2"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathURL}
            {item.nanoid}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>
          {/* <p>{item.uid}</p> */}
          <div className="flex space-x-2">
            <Button
              type="button"
              text="Delete"
              color="red"
              loading={loading[item.nanoid]}
              onClick={() => handleClickDelete(item.nanoid)}
            />
            <Button
              type="button"
              text="Edit"
              color="cyan"
              onClick={() => handleClickEdit(item)}
            />
            <Button
              type="button"
              text={copy[item.nanoid] ? "Copied" : "Copy"}
              color="blue"
              onClick={() => handleClickCopy(item.nanoid)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
