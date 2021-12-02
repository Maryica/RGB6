import { createContext, useCallback, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

export const ThemaContext = createContext();

const themes = {
  dark: {
    color: "#d17272",
  },
  light: {
    color: "#fff",
  },
};

const themesMUI = {
  dark: createTheme({
    palette: {
      primary: {
        main: "#d17272",
      },
    },
  }),
  light: createTheme({
    palette: {
      primary: {
        main: "#0000ff",
      },
    },
  }),
};

export const CustomThemeProvider = ({ children, initialTheme = "light" }) => {
  const [theme, setTheme] = useState({
    theme: themes[initialTheme],
    name: initialTheme,
  });

  const themeSetter = useCallback((name) => {
    if (themes[name]) {
      setTheme({
        name,
        theme: themes[name],
      });
    }
  }, []);

  return (
    <ThemaContext.Provider value={{ theme, themeSetter }}>
      <ThemeProvider theme={themesMUI[theme.name]}>{children}</ThemeProvider>
    </ThemaContext.Provider>
  );
};