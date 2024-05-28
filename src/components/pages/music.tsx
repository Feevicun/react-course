// music.tsx
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormLabel,
  FormHelperText,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormContainer, LeftGreenBackground } from "../styled/styles";
import { useNavigate } from "react-router-dom";
import { useFormData } from "./DataContext";
import { useLanguage } from "../LanguageContext";
import { routes } from "../Routes";

enum Genre {
  Funk = "Funk",
  Rock = "Rock",
  Metal = "Metal",
  Jazz = "Jazz",
  Pop = "Pop",
  HipHopRap = "HipHopRap",
  ElectronicDance = "ElectronicDance",
  RnBSoul = "RnBSoul",
  Classical = "Classical",
  Country = "Country",
  Alternative = "Alternative",
  Indie = "Indie",
}

interface MusicFormProps {
  onSubmit?: (formData: FormData) => void;
}

export interface FormData {
  id: string;
  name: string;
  genre: Genre | "";
  artist: string;
  releasedOn: string;
}

const MusicForm: React.FC<MusicFormProps> = ({ onSubmit }) => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.between("xs", "md"));
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "xl"));
  const [id, setId] = useState<string>(new Date().getTime().toString());
  const {
    control,
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { id } });

  const { setFormData } = useFormData();

  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
    setFormData((prevData) => [...prevData, data]);
    navigate(routes.playlist);
  };

  const handleReset = () => {
    setId(new Date().getTime().toString());
    reset();
  };

  const minDate = "1980-01-01";
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box>
      <LeftGreenBackground>
        <div style={{ width: "80%", textAlign: "center" }}>
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXkzY3VkOWZ6cHRza2MxdmZ3ZGVmN2g2cWQ2YnV3b29lcnJmaTB3YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/LwBTamVefKJxmYwDba/giphy.gif"
            alt="Guitar GIF"
            style={{ width: "62%", height: "36%", objectFit: "cover" }}
          />
          <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
            {translations.form.musicDescription}
          </Typography>
        </div>
      </LeftGreenBackground>

      <FormContainer
        sx={{
          ...(isSmall && {
            width: "50%",
            left: '20%',
            transform: "translateX(-25px)",
          }),
          ...(isMedium &&{
            width: "100%",
          })
        }}
      >
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Typography variant="h4">{translations.form.musictitle}</Typography>

          <TextField
            label={translations.form.musicLabel}
            {...register("name", {
              required: translations.musicErrors.name.required,
              minLength: {
                value: 2,
                message: translations.musicErrors.name.minLength,
              },
              maxLength: {
                value: 20,
                message: translations.musicErrors.name.maxLength,
              },
              validate: (value) =>
                value.charAt(0) === value.charAt(0).toUpperCase() ||
                translations.musicErrors.name.validate,
            })}
            margin="normal"
            fullWidth
            sx={{ marginBottom: 1.5 }}
            error={!!errors.name}
            helperText={errors.name?.message}
            onBlur={() => trigger("name")}
            onChange={(e) => {
              register("name").onChange(e);
              trigger("name");
            }}
          />

          <Controller
            name="genre"
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: translations.musicErrors.genre.validate,
              },
            }}
            render={({ field }) => (
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 1.5 }}
              >
                <InputLabel>{translations.form.musicGenre}</InputLabel>
                <Select
                  {...field}
                  label={translations.form.musicGenre}
                  onBlur={() => trigger("genre")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("genre");
                  }}
                >
                  {Object.values(Genre).map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {translations.enums.Genre[genre]}
                    </MenuItem>
                  ))}
                </Select>
                {errors.genre && (
                  <FormHelperText error>
                    {translations.musicErrors.genre.required}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />

          <FormControl
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 1.5, marginTop: -2 }}
          >
            <TextField
              label={translations.form.artistLabel}
              {...register("artist", {
                required: translations.musicErrors.artist.required,
                minLength: {
                  value: 2,
                  message: translations.musicErrors.artist.minLength,
                },
                maxLength: {
                  value: 20,
                  message: translations.musicErrors.artist.maxLength,
                },
                validate: (value) =>
                  value.charAt(0) === value.charAt(0).toUpperCase() ||
                  translations.musicErrors.artist.validate,
              })}
              margin="normal"
              fullWidth
              error={!!errors.artist}
              helperText={errors.artist?.message}
              onBlur={() => trigger("artist")}
              onChange={(e) => {
                register("artist").onChange(e);
                trigger("artist");
              }}
            />
          </FormControl>

          <FormControl
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 1.5, marginTop: -1 }}
          >
            <FormLabel htmlFor="releasedOn">
              {translations.form.dateLabel}
            </FormLabel>
            <TextField
              type="date"
              {...register("releasedOn", {
                required: translations.musicErrors.releasedOn.required,
                min: {
                  value: minDate,
                  message: translations.musicErrors.releasedOn.min,
                },
                max: {
                  value: today,
                  message: translations.musicErrors.releasedOn.max,
                },
              })}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              error={!!errors.releasedOn}
              helperText={errors.releasedOn?.message}
              onBlur={() => trigger("releasedOn")}
              onChange={(e) => {
                register("releasedOn").onChange(e);
                trigger("releasedOn");
              }}
            />
          </FormControl>

          <Button type="submit">{translations.form.submitButton}</Button>
          <Button type="button" onClick={handleReset}>
            {translations.form.clearButton}
          </Button>
        </form>
      </FormContainer>
    </Box>
  );
};

export default MusicForm;
