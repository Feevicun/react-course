import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import violet from "../../img/error_violet.svg";
import green from "../../img/error_green.svg";
import { useThemeCustom } from "../../theme/ThemeContext";
import { useLanguage } from "../LanguageContext";


const NotFound: React.FC = () => {
const { translations } = useLanguage();
  const { darkMode } = useThemeCustom();
  const theme = useTheme();
  const imagePath = darkMode ? violet : green;
  const isMobileTablet = useMediaQuery(theme.breakpoints.down("xl"));
  
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          flexDirection: isMobileTablet ? "column" : "row",
        }}
      >
        <Box
          sx={{
            width: isMobileTablet ? "100%" : 600,
            height: isMobileTablet? "auto" : 600,
            display: "flex",
            flexDirection: "column",
            marginRight: 0,
            alignItems: isMobileTablet? "center" : "flex-start",
            textAlign: isMobileTablet ? "center" : "left",
          }}
        >
          <Typography
            variant={isMobileTablet ? "h4" : "h3"}
            sx={{
              textTransform: "uppercase",
              fontSize: isMobileTablet ? 50 : 100,
              marginBottom: isMobileTablet ? 2 : "inherit",
              marginTop: isMobileTablet ? 20 : "inherit",
            }}
          >
            {translations.notFound.title}
          </Typography>
          <Typography
            variant={isMobileTablet ? "h4" : "h3"}
            sx={{
              textTransform: "uppercase",
              fontSize: isMobileTablet ? 30 : 80,
              marginBottom: isMobileTablet ? 2 : "inherit",
            }}
          >
            {translations.notFound.message}
          </Typography>
        </Box>
        <img
          src={imagePath}
          alt="theme image"
          style={{
            width: isMobileTablet ? 400 : 700,
            height: isMobileTablet ? 400 : 700,
            marginRight: isMobileTablet ? 50 : 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default NotFound;
