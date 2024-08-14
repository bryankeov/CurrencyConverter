import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Kanye from "./Kanye.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Kanye />
  </React.StrictMode>
);
