import React, { useState } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { StyledAppBar } from "./components/styled/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Routes from "./components/Routes";
import uaFlag from "./img/ua.png";
import enFlag from "./img/en.png";
import { useThemeCustom } from "./theme/ThemeContext";
import { useLanguage } from "./components/LanguageContext";
import { MaterialUISwitch } from "./components/styled/Switch";

const Layout: React.FC = () => {
  const { darkMode, toggleDarkMode } = useThemeCustom();
  const { language, toggleLanguage } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const handleItemClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box>
      <StyledAppBar sx={{height:isMobileOrTablet? 50: 80}}>
        <Toolbar>
          {isMobileOrTablet ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ position: "fixed", left: "5%" }}
            >
              <MenuIcon
                style={{
                  color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                }}
              />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", width: "100%" }}>
              <Routes onClick={handleItemClick} />
            </Box>
          )}
        </Toolbar>
        <Box
          sx={{
            position: "absolute",
            right: 20,
            zIndex: 2,
            padding: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton onClick={toggleLanguage} aria-label="toggle language">
            <Box
              component="img"
              src={language === "en" ? enFlag : uaFlag}
              alt="language flag"
              sx={{
                width: isMobileOrTablet ? 30 : 35,
                height: isMobileOrTablet ? 30 : 35,
              }}
            />
          </IconButton>
          <MaterialUISwitch
            checked={darkMode}
            onChange={toggleDarkMode}
            inputProps={{ "aria-label": "toggle dark mode" }}
            color="secondary"
          />
        </Box>
      </StyledAppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
            width: isMobileOrTablet ? "80vw" : "100vw",
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <ArrowBackIosIcon
            onClick={toggleDrawer(false)}
            sx={{ width: 50, height: 50 }}
          />
        </Box>
        <Routes onClick={handleItemClick} />
      </Drawer>
      <main>
        <Outlet />
      </main>
    </Box>
  );
};

export default Layout;
