import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./Helpers/queryClient";
import App from "./App";
import "./index.css";
import { registerServieWorker } from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServieWorker();
