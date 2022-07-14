import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBVPntGNPAzFCQcMhXj4QLBzRC3LcyK-fU",
  authDomain: "react-2022-1d598.firebaseapp.com",
  projectId: "react-2022-1d598",
  storageBucket: "react-2022-1d598.appspot.com",
  messagingSenderId: "447048588744",
  appId: "1:447048588744:web:539c5b726f66cce997f4fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// auth trae la configuracion del proyecto
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
