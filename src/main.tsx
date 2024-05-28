import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  MusicProvider,
  UserProvider,
} from "./components/pages/DataContext.tsx";
import { ThemeProvider } from "./theme/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
  <MusicProvider>
    <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </MusicProvider>
  </ThemeProvider>
);
