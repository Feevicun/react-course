import { useEffect, useState } from "react";
import { useFormData } from "./DataContext";
import {
  Accordion,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FavoriteCard } from "./Card";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccordionSummary from "@mui/material/AccordionSummary";

export interface Song {
  id: string;
  songName: string;
  artist: string;
  genre: string;
  date: string;
}

export default function Songs() {
  const { formData } = useFormData();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [deletedSongIds, setDeletedSongIds] = useState<string[]>([]);
  const [songs, setSongs] = useState<Song[]>(() => {
    const savedSongs = localStorage.getItem("songs");
    if (savedSongs) {
      return JSON.parse(savedSongs);
    } else {
      return formData
        .filter((song) => !deletedSongIds.includes(song.id))
        .map((data: any) => ({
          id: data.id,
          songName: data.name,
          artist: data.artist,
          genre: data.genre,
          date: data.releasedOn,
        }));
    }
  });

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    const newSongs = formData.map((data: any) => ({
      id: data.id,
      songName: data.name,
      artist: data.artist,
      genre: data.genre,
      date: data.releasedOn,
    }));

    setSongs((prevSongs) => {
      const updatedSongs = [...prevSongs];
      newSongs.forEach((newSong) => {
        if (
          !prevSongs.some((song) => song.id === newSong.id) &&
          !deletedSongIds.includes(newSong.id)
        ) {
          updatedSongs.push(newSong);
        }
      });
      return updatedSongs.filter((song) => !deletedSongIds.includes(song.id));
    });
  }, [formData, deletedSongIds]);

  const [favorites, setFavorites] = useState<FavoriteCard[]>(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites");
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      return Array.isArray(parsedFavorites) ? parsedFavorites : [];
    } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: string) => {
    return favorites.some((favorite) => favorite.id === id);
  };

  const addToFavorites = (song: Song) => {
    const newFavorite: FavoriteCard = {
      id: song.id,
      name: song.songName,
      artist: song.artist,
      releasedOn: song.date,
    };
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    song: Song
  ) => {
    event.dataTransfer.setData("song", JSON.stringify(song));
  };

  const handleDeleteSong = (id: string) => {
    setDeletedSongIds((prevDeletedSongIds) => [...prevDeletedSongIds, id]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {songs.map((song, index) => (
        <Accordion
          key={index}
          sx={{ height: "auto", width: "auto", boxShadow: "none" ,  textAlign: "center",}}
          draggable
          onDragStart={(event) => handleDragStart(event, song)}
        >
          <AccordionSummary sx={{ width: "100%",}}>
            <Box
              sx={{
                marginTop: 0.5,
                cursor: "pointer",
                marginRight: 3,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <DeleteOutlineIcon
                onClick={() => handleDeleteSong(song.id)}
                sx={{ width: isTablet ? 40 : 50, height: isTablet ? 30 : 40 }}
              />
              <FavoriteIcon
                onClick={() => {
                  isFavorite(song.id)
                    ? removeFromFavorites(song.id)
                    : addToFavorites(song);
                }}
                sx={{
                  width: isTablet ? 40 : 50,
                  height: isTablet ? 30 : 40,
                  color: isFavorite(song.id) ? "#FF0000" : "rgb(191, 81, 81)",
                }}
              />
            </Box>
            <Typography
  sx={{
    fontSize: isTablet ? 16 : 35, 
  }}
>
  {song.songName.length > 10 ? ( 
    <>
      {song.songName.substring(0, song.songName.length / 2)} <br />
      {song.songName.substring(song.songName.length / 2)}
    </>
  ) : (
    `${song.songName} - ${song.artist}`
  )}
</Typography>

          </AccordionSummary>
        </Accordion>
      ))}
    </Box>
  );
}
