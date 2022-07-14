import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  //Para el metodo de deslogueo Web/comenzar/configura el observador
  useEffect(() => {
    //ell metodo onAuthStateChanged verificara si el usuario esta autenticado o no.
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      //console.log(user);
      if (user) {
        //destructuramos de user
        const { email, photoURL, displayName, uid } = user;
        setUser({ email, photoURL, displayName, uid });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsuscribe;
    };
  }, []);

  //metodo para acceder a los componentes: createUserWithEmailAndPassword.
  const registerUser = (email, password) =>
    //web/comenzar/Regitra usuarios nuevos
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    //web/comenzar/Acceso de usuarios existentes
    signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => {
    signOut(auth);
  };

  return (
    //Los Children son componentes que estaran en el interior del Provider.
    <UserContext.Provider
      value={{ user, setUser, registerUser, loginUser, signOutUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
