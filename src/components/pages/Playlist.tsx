import { Box, Divider, Grid, Typography } from "@mui/material";
import UsersBox from "./UsersBox";
import Songs from "./Songs";
import { useLanguage } from "../LanguageContext";

export default function Playlist() {
  const { translations } = useLanguage();
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          textTransform: "uppercase",
          textAlign: "center",
          marginTop: { xs: 8, md: 15 },
          marginBottom: { xs: 4, md: 6 },
        }}
      >
        {translations.playlist.header}
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            border: "3px solid #ccc",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            textAlign: "center",
            marginBottom: { xs: 3, sm: 3, lg: 0 },
            maxWidth: { xs: "90%" },
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h4"
            sx={{

              textAlign: "center",
              fontSize: { xs: 16, md: 20, lg: 30 },
            }}
          >
            {translations.playlist.users}
          </Typography>
          <UsersBox />
        </Grid>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ display: { xs: "none", lg: "block" }, marginLeft: { lg: 5 } }}
        />
        <Grid
          item
          xs={12}
          lg={5}
          sx={{
            border: "3px solid #ccc",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            textAlign: "center",
            maxWidth: { xs: "90%" },
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h4"
            sx={{

              textAlign: "center",
              fontSize: { xs: 16, md: 20, lg: 30 },
            }}
          >
            {translations.playlist.songs}
          </Typography>
          <Songs />
        </Grid>
      </Grid>
    </Box>
  );
}
