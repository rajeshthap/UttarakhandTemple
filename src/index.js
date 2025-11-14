import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./Component/GlobleAuth/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider> 

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);


