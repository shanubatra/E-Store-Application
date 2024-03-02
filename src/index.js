import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import myStore from "./Store/Store";
import { Provider } from "react-redux";

let root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <Provider store={myStore}>
      <App />
    </Provider>
  </>
);
