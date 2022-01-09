import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@material-ui/core";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import {AuthProvider} from "./contexts/auth";

const theme = createTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    background: {
      paper: "rgba(255, 255, 254, 1)",
      default: "rgba(216, 238, 254, 1)",
    },
    primary: {
      light: "rgba(158, 212, 253, 1)",
      main: "rgba(61, 169, 252, 1)",
      dark: "rgba(30, 84, 126, 1)",
      contrastText: "rgba(255, 255, 254, 1)",
    },
    secondary: {
      light: "rgba(177, 202, 220, 1)",
      main: "rgba(144, 180, 206, 1)",
      dark: "rgba(100, 125, 144, 1)",
      contrastText: "rgba(255, 255, 254, 1)",
    },
    error: {
      light: "rgba(243, 124, 147, 1)",
      main: "rgba(239, 69, 101, 1)",
      dark: "rgba(167, 48, 70, 1)",
      contrastText: "rgba(255, 255, 254, 1)",
    },
    text: {
      primary: "rgba(9, 64, 103, 1)",
      secondary: "rgba(95, 108, 123, 1)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
  },
});

const App: React.FC = () => {
  return (
    <div>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <MainRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
