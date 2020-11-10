import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App title="The Github Cars App" />
  </React.StrictMode>,
  rootElement
);
