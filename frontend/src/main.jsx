/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/global/GlobalContext.jsx";
import { ExbProvider } from "./context/exb/ExbContext.jsx";
import { ArtworkProvider } from "./context/artwork/ArtworkContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* global provider */}
    <GlobalProvider>
      {/* artwork provider */}
      <ArtworkProvider>
        {/* exhibition provider */}
        <ExbProvider>
          {/* browser router */}
          <BrowserRouter>
            {/*  */}
            <App />
          </BrowserRouter>
          {/*  */}
        </ExbProvider>
        {/*  */}
      </ArtworkProvider>
      {/*  */}
    </GlobalProvider>
    {/*  */}
  </React.StrictMode>
);
