import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import UseProvivider from "./context/UseProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UseProvivider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UseProvivider>
  </React.StrictMode>
);
