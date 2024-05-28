import React from "react";
import { useTheme } from "@mui/material/styles";
import { StyledLink } from "./styled/styles";
import { useLanguage } from "./LanguageContext";
import { useMediaQuery } from "@mui/material";

export const routes = {
  home: "/home",
  user: "/user",
  music: "/music",
  cards: "/cards",
  favorites: "/favorites",
  playlist: "/playlist",
  contact: "/contact",
};

const Routes: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const theme = useTheme();
  const { translations } = useLanguage();
  const linkStyle = {
    color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
  };
  const isLarge = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const routeList = [
    { path: routes.home, label: translations.routes.homepage },
    { path: routes.user, label: translations.routes.userform },
    { path: routes.music, label: translations.routes.musicform },
    { path: routes.cards, label: translations.routes.cards },
    { path: routes.favorites, label: translations.routes.favorites },
    { path: routes.playlist, label: translations.routes.playlist },
    { path: routes.contact },
  ];

  return (
    <>
      {routeList.map(({ path, label }) => (
        <StyledLink
          style={linkStyle}
          sx={{
            ...(isLarge && {
              fontSize: 20,
              padding: 0,
              marginRight: 4,
            }),
          }}
          key={path}
          to={path}
          onClick={onClick}
        >
          {label}
        </StyledLink>
      ))}
    </>
  );
};

export default Routes;
