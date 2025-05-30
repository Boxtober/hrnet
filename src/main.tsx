// import * as React from 'react';
// import * as ReactDOM from 'react-dom/client';
// import { StyledEngineProvider } from '@mui/material/styles';
// import App from './App.tsx';

// ReactDOM.createRoot(document.querySelector("#root")!).render(
//   <React.StrictMode>
//     <StyledEngineProvider injectFirst>
//       <App />
//     </StyledEngineProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./index.css";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
