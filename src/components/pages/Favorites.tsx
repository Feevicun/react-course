import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { FavBox } from "../styled/styles";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { FavoriteCard } from "./Card";
import { useLanguage } from "../LanguageContext";

export default function Favorites() {
  const { translations } = useLanguage();
  const [favoriteFormDataList, setFavoriteFormDataList] = useState<
    FavoriteCard[]
  >([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavoriteFormDataList(storedFavorites);
  }, []);

  return (
    <>
      {favoriteFormDataList.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "100%",
            marginTop: { xs: 12, md: 20 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {translations.favorites.title}
          </Typography>

          <FavBox
            sx={{
              maxWidth: { xs: 100 , sm: 100 , md: 300, lg:400 },
              minWidth: 200,
              marginTop: 4,
            }}
          >
            <Typography variant="h6">
              <List>
                {favoriteFormDataList.map((formData, index) => (
                  <ListItem key={index}>
                    <Typography variant="body1">
                      {formData.artist} - {formData.name}&nbsp;
                      {formData.releasedOn}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Typography>
          </FavBox>
        </Box>
      )}
    </>
  );
}
