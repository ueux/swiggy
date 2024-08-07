import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utilities/store.js";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <Provider store={store}>
    <React.StrictMode>
        <App />

      <Toaster/>
      </React.StrictMode>
      </Provider>
  </BrowserRouter>
);
