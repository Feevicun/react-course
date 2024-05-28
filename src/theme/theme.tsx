import { createTheme } from "@mui/material/styles";
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 920,
    lg: 1536,
    xl:  1936,
  },
};
export const createCustomTheme = (darkMode: boolean) => {
  return createTheme({
    breakpoints: breakpoints,
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#646bf3" : "#6ee6ba",
      },
      secondary: {
        main: darkMode ? "#6ee6ba" : "#646bf3",
      },
      background: {
        default: darkMode ? "#101113" : "#f5f5dc",
      },
      text: {
        primary: darkMode ? "#646bf3" : "#333333",
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          gutterBottom: true
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        styleOverrides: {
          root: {
            width: 150,
            height: 35,
            margin: "0.5em",
            color: darkMode ? "#000000" : "#ffffff",
            backgroundColor: darkMode ? "#646bf3" : "#6ee6ba",
            border: "none",
            borderRadius: 5,
            fontSize: 15,
            cursor: "pointer",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
            '&:hover': {
              backgroundColor: darkMode ? "#575ed1" : "#5ed5a5",
            },
          },
        },
      },
      MuiAccordion:{
        styleOverrides:{
          root:{
            backgroundColor: "transparent",
            backgroundImage: "none",
            width: 400,
            height: 100,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            textTransform: "uppercase",
            margin: 50,
            borderBottom: 0,
            boxShadow: "none",
            "&:last-child": {
              borderBottom: 0,
            },
            "&:before": {
              display: "none",
            },
          }
        }
      },
      MuiTextField:{
        defaultProps:{
          variant: "outlined",
        },
      }
    },
  });
};
