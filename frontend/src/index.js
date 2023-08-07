import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { App } from "./App";
import { GlobalStyle } from "./GlobalStyle";

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
