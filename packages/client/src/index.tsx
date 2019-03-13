import React from "react";
import { render } from "react-dom";
import App from "./components/containers/App/App";
import { StateProvider } from "./components/utils/WithState/WithState";
import { ActionsProvider } from "./components/utils/WithActions/WithActions";

render(
  <StateProvider>
    <ActionsProvider>
      <App />
    </ActionsProvider>
  </StateProvider>,
  document.getElementById("root")
);
