import React, { useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "@mui/material";
import { createCustomTheme } from "./theme/theme";
import { GlobalStyle } from "./components/styled/styles";
import { LanguageProvider} from "./components/LanguageContext";

import { useThemeCustom } from "./theme/ThemeContext";

const App: React.FC = () => {
  const { darkMode} = useThemeCustom();
  const [theme, setTheme] = useState(createCustomTheme(darkMode));
  useEffect(() => {
    setTheme(createCustomTheme(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    
      <AppRouter />
    </ThemeProvider>
  );
};

const Root: React.FC = () => {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};

export default Root;
