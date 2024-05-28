import {
  Box,
  Typography,
  Modal,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import icon1 from "../../img/icon1female.png";
import icon2 from "../../img/icon2female.png";
import icon3 from "../../img/icon3female.png";
import icon4 from "../../img/icon1man.png";
import icon5 from "../../img/icon2man.png";
import icon6 from "../../img/cat.png";
import icon7 from "../../img/dog.png";
import icon8 from "../../img/sea-lion.png";
import icon9 from "../../img/icon3man.png";
import userWhite from "../../img/userWhite.png";
import userBlack from "../../img/userBlack.png";
import { StyledIconBox, StyledModal } from "../styled/styles";
import { useLanguage } from "../LanguageContext";
import { useEffect, useState } from "react";
import { User } from "./UsersBox";
import { useThemeCustom } from "../../theme/ThemeContext";

interface ModalUserProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  updateUserData: (updatedUser: User) => void;
}

export default function ModalUser({
  isOpen,
  onClose,
  userId,
  updateUserData,
}: ModalUserProps) {
  const { translations } = useLanguage();
  const iconArray = [
    icon1,
    icon2,
    icon3,
    icon4,
    icon5,
    icon9,
    icon6,
    icon7,
    icon8,
  ];
  const { darkMode } = useThemeCustom();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const colorBorder = darkMode ? "#646bf3" : "#00FF00";
  const defaulticon = darkMode ? userWhite : userBlack;
  const [selectedIcon, setSelectedIcon] = useState(defaulticon);
  const [isIconModalOpen, setIsIconModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      const savedUsers = localStorage.getItem("users");
      if (savedUsers) {
        const users = JSON.parse(savedUsers);
        const user = users.find((user: User) => user.id === userId);
        setUserData(user || null);
        setSelectedIcon(user && user.icon ? user.icon : defaulticon);
      }
    }
  }, [userId, darkMode]);

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
  };

  const handleSaveIcon = () => {
    let updatedIcon: string | undefined = undefined;
    if (selectedIcon !== defaulticon) {
      updatedIcon = selectedIcon;
    }
    if (userData) {
      const updatedUser: User = {
        ...userData,
        icon: updatedIcon !== null ? updatedIcon : userData.icon,
      };
      updateUserData(updatedUser);
    }
    setIsIconModalOpen(false);
  };

  if (!userData) {
    return null;
  }

  return (
    <StyledModal
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0)" },
      }}
      open={isOpen}
      sx={{
        width: isTablet ? "100%" : "30%",
        height: isTablet ? "100%" : "50%",
      }}
    >
      <Box>
        <Box sx={{ marginBottom: 2, textAlign: "center" }}>
          <img
            src={selectedIcon}
            alt="Avatar"
            style={{
              width: isTablet ? 60 : 120,
              height: isTablet ? 60 : 120,
              borderRadius: "50%",
              cursor: "pointer",
              border: `4px solid ${colorBorder}`,
              padding: 6,
            }}
            onClick={() => setIsIconModalOpen(true)}
          />
          <Typography
            sx={{ fontSize: isTablet ? 20 : 35, overflowWrap: "anywhere" }}
          >
            {translations.card.user} {userData.userName}
          </Typography>
          <Typography sx={{ fontSize: isTablet ? 20 : 35 }}>
            {translations.card.age} {userData.age}
          </Typography>
          <Typography sx={{ fontSize: isTablet ? 20 : 35 }}>
            {translations.card.mood} {translations.enums.Mood[userData.mood]}
          </Typography>
          <Typography
            sx={{
              fontSize: isTablet ? 20 : 35,
              overflowWrap: "anywhere",
              margin: 1,
            }}
          >
            {translations.card.preferredGenres}{" "}
            {userData.genres && Array.isArray(userData.genres)
              ? userData.genres
                  .map((genre) => translations.enums.Genre[genre])
                  .join(", ")
              : "No genres available"}
          </Typography>
          <Button
            sx={{
              marginTop: isTablet ? 0 : 4,
            }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>

        <Modal
          open={isIconModalOpen}
          onClose={() => setIsIconModalOpen(false)}
          sx={{
            width: isTablet ? "auto" : "20%",
            height: isTablet ? "auto" : "45%",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <StyledIconBox>
            <Typography variant={isTablet ? "h6" : "h4"} component="h2">
              {translations.playlist.iconPicker}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                width: isTablet ? "70%" : "100%",
              }}
            >
              {iconArray.map((icon, index) => (
                <img
                  key={index}
                  src={icon}
                  alt={`icon-${index}`}
                  style={{
                    width: isTablet ? 60 : 120,
                    height: isTablet ? 60 : 120,
                    margin: 5,
                    cursor: "pointer",
                    border:
                      selectedIcon === icon
                        ? `5px solid ${colorBorder}`
                        : "none",
                    borderRadius: selectedIcon === icon ? "50%" : "none",
                  }}
                  onClick={() => handleIconClick(icon)}
                />
              ))}
            </Box>
            <Button onClick={handleSaveIcon}>Save</Button>
          </StyledIconBox>
        </Modal>
      </Box>
    </StyledModal>
  );
}
