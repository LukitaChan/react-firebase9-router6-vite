import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UseProvider";

import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Perfil from "./routes/Perfil";
import NotFound from "./routes/NotFound";

import Navbar from "./components/Navbar";
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth";
import LayoutContainerForm from "./components/layouts/LayoutContainerForm";

const App = () => {
  const { user } = useContext(UserContext);
  //false es el estado inicial del usuario (cuando inicializa); luego se usa el observable de estado (onAuthStateChanged) que determina si hay user existente o null.
  if (user === false) {
    return <p>Loading user...</p>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>

        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
