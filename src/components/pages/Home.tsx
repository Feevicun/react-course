import {
  Box,
  Typography,
  Modal,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Timeline from "./Timeline";
import violet from "../../img/violet.svg";
import green from "../../img/green.svg";
import { useLanguage } from "../LanguageContext";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useThemeCustom } from "../../theme/ThemeContext";
import { useState } from "react";
import { routes } from "../Routes";
import { useSpring, useTrail, animated, config } from "@react-spring/web";

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { darkMode } = useThemeCustom();
  const imagePath = darkMode ? violet : green;
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLarge = useMediaQuery(theme.breakpoints.between("md", "xl"));
  const isXl = useMediaQuery(theme.breakpoints.up("md"));
  const { translations } = useLanguage();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const redirectToContactForm = () => {
    navigate(routes.contact);
  };

  const titleProps = useSpring({
    from: { opacity: 0, transform: "translateY(-50%)" },
    to: { opacity: 1, transform: "translateX(0)" },
    delay: 800,
    config: config.gentle,
  });

  const descriptionProps = useSpring({
    from: { opacity: 0, transform: "translateY(50%)" },
    to: { opacity: 1, transform: "translateX(0)" },
    delay: 900,
    config: config.gentle,
  });

  const imageProps = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    delay: 1000,
    config: config.gentle,
  });

  const iconTrail = useTrail(2, {
    from: { opacity: 0, transform: "scale(0.5) rotate(0deg)" },
    to: { opacity: 1, transform: "scale(1) rotate(360deg)" },
    delay: 1100,
    config: config.gentle,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{ textAlign: "center", width: "80%", marginTop: isXl? 15: isLarge ? 25 : 12 }}
      >
        <animated.div style={titleProps}>
          <Typography
            variant={isXl? 'h3':isLarge ? "h2" : "h6"}
            sx={{ textTransform: "uppercase" }}
          >
            {translations.home.title}
          </Typography>
        </animated.div>
        <animated.div style={descriptionProps}>
          <Typography variant={isXl? "h5":isLarge ? "h5" : "body2"}>
            {translations.home.description}
          </Typography>
        </animated.div>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          maxWidth: 1200,
        }}
      >
        {!isTablet && !isLarge && (
          <Box
            sx={{
              marginTop: "90px",
              width: "40%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <OutlinedTimeline />
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width:isXl? '80%': isLarge ? "90%" : isTablet ? "80%" : "40%",
          }}
        >
          <animated.img
            src={imagePath}
            alt="theme image"
            style={{
              marginTop: isLarge ? "90px" : isTablet ? "50px" : "100px",
              marginLeft: isLarge ? "5%" : isTablet ? "7%" : "40%",
              width: "100%",
              height: "auto",
              maxHeight: "50%",
              ...imageProps,
            }}
          />
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">{translations.home.alert1}</Typography>
          <Typography variant="h6">{translations.home.alert2}</Typography>
        </Box>
      </Modal>

      <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
        <Tooltip title={translations.home.alerticon} arrow>
          <animated.div style={iconTrail[0]}>
            <IconButton
              onClick={handleOpen}
              sx={{
                animation: "pulse 1.5s infinite",
                "@keyframes pulse": {
                  "0%": {
                    transform: "scale(1)",
                    color: theme.palette.text.primary,
                  },
                  "50%": {
                    transform: "scale(1.2)",
                    color: theme.palette.primary.main,
                  },
                  "100%": {
                    transform: "scale(1)",
                    color: theme.palette.text.primary,
                  },
                },
              }}
            >
              <ErrorOutlineIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
          </animated.div>
        </Tooltip>
        <Tooltip title={translations.home.emailicon} arrow>
          <animated.div style={iconTrail[1]}>
            <IconButton
              onClick={redirectToContactForm}
              sx={{
                animation: "pulse 1.5s infinite",
                "@keyframes pulse": {
                  "0%": {
                    transform: "scale(1)",
                    color: theme.palette.text.primary,
                  },
                  "50%": {
                    transform: "scale(1.2)",
                    color: theme.palette.secondary.main,
                  },
                  "100%": {
                    transform: "scale(1)",
                    color: theme.palette.text.primary,
                  },
                },
              }}
            >
              <MailOutlineIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
          </animated.div>
        </Tooltip>
      </Box>
    </Box>
  );
}

function OutlinedTimeline() {
  return (
    <Box>
      <Timeline />
    </Box>
  );
}
