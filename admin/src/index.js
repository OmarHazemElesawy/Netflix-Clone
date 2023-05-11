import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ProvidersWrapper from "./components/layout/ProvidersWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProvidersWrapper>
    <App />
  </ProvidersWrapper>
);
