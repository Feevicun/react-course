//user.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormContainer, LeftGreenBackground } from "../styled/styles";
import {
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLanguage } from "../LanguageContext";
import { useUserData } from "./DataContext";
import { routes } from "../Routes";
import { userName } from "../Regex/RegexUtil";

export enum Mood {
  Happy = "Happy",
  Sad = "Sad",
  Energetic = "Energetic",
  Relaxing = "Relaxing",
  Chill = "Chill",
  PumpUp = "PumpUp",
}

export enum Genre {
  Pop = "Pop",
  Rock = "Rock",
  HipHopRap = "HipHopRap",
  ElectronicDance = "ElectronicDance",
  RnBSoul = "RnBSoul",
  Classical = "Classical",
  Jazz = "Jazz",
  Country = "Country",
  Alternative = "Alternative",
  Indie = "Indie",
}

interface FormProps {
  onSubmit?: SubmitHandler<FormDataUser>;
}

export interface FormDataUser {
  id: string;
  name: string;
  age: string;
  mood: Mood | "";
  genres: Genre[];
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const { translations } = useLanguage();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.between("xs", "md"));
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "xl"));
  const navigate = useNavigate();
  const [id, setId] = useState<string>(new Date().getTime().toString());
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    trigger,
  } = useForm<FormDataUser>({
    defaultValues: {
      id,
      name: "",
      age: "",
      mood: "",
      genres: [],
    },
  });
  const { setUserData } = useUserData();
  const onFormSubmit: SubmitHandler<FormDataUser> = (data) => {
    if (onSubmit) {
      onSubmit(data);
      setId(new Date().getTime().toString());
    }

    setUserData((prevData) => [...prevData, data]);
    reset();
    navigate(routes.music);
  };

  return (
    <Box>
      <LeftGreenBackground>
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGh6enU4cHhwcHgwNG96eHRnbmZrOGVjYWI5dDEyZjZ5bnJrODBwMiZlcD12MV9pbnRlcm5naWZfYnlfaWQmY3Q9cw/TeBpzQZRaBIC4/giphy.gif"
          alt="Guitar GIF"
          style={{ width: "62%", height: "70%", objectFit: "cover" }}
        />
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
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Typography variant="h4">{translations.form.usertitle}</Typography>
          <Box sx={{ marginBottom: 1.5 }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: translations.userErrors.nameRequired,
                pattern: {
                  value: userName,
                  message: translations.userErrors.pattern,
                },
                minLength: {
                  value: 3,
                  message: translations.userErrors.nameMinLength,
                },
                maxLength: {
                  value: 30,
                  message: translations.userErrors.nameMaxLength,
                },
                validate: {
                  noLeadingSpace: (value) =>
                    value.trim().length === value.length ||
                    translations.userErrors.noLeadingSpace,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={translations.form.nameLabel}
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  onBlur={() => trigger("name")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("name");
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ marginBottom: 1.5 }}>
            <Controller
              name="age"
              control={control}
              defaultValue=""
              rules={{
                required: translations.userErrors.ageRequired,
                min: {
                  value: 18,
                  message: translations.userErrors.ageMin,
                },
                max: {
                  value: 120,
                  message: translations.userErrors.ageMax,
                },
                validate: {
                  isNumber: (value) =>
                    !isNaN(Number(value)) || translations.userErrors.isNumber,
                  noSpecialChars: (value) =>
                    /^[0-9]*$/.test(value) ||
                    translations.userErrors.noSpecialChars,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={translations.form.ageLabel}
                  type="number"
                  fullWidth
                  error={!!errors.age}
                  helperText={errors.age ? errors.age.message : ""}
                  onBlur={() => trigger("age")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("age");
                  }}
                />
              )}
            />
          </Box>
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 1.5 }}>
            <InputLabel>{translations.form.moodLabel}</InputLabel>
            <Controller
              name="mood"
              control={control}
              defaultValue=""
              rules={{ required: translations.userErrors.moodRequired }}
              render={({ field }) => (
                <Select
                  {...field}
                  label={translations.form.moodLabel}
                  required
                  fullWidth
                  error={!!errors.mood}
                  onBlur={() => trigger("mood")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("mood");
                  }}
                >
                  {Object.values(Mood).map((mood) => (
                    <MenuItem key={mood} value={mood}>
                      {translations.enums.Mood[mood]}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.mood && (
              <Typography variant="body2" color="error">
                {errors.mood.message}
              </Typography>
            )}
          </FormControl>
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 1.5 }}>
            <InputLabel>{translations.form.genreLabel}</InputLabel>
            <Controller
              name="genres"
              control={control}
              defaultValue={[]}
              rules={{
                validate: {
                  required: (value) =>
                    value.length > 0 || translations.userErrors.genresRequired,
                  max: (value) =>
                    value.length <= 3 || translations.userErrors.genresMax,
                },
              }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    multiple
                    label={translations.form.genreLabel}
                    fullWidth
                    error={!!errors.genres}
                    onBlur={() => trigger("genres")}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("genres");
                    }}
                  >
                    {Object.values(Genre).map((genre) => (
                      <MenuItem key={genre} value={genre}>
                        {translations.enums.Genre[genre]}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.genres && (
                    <Typography variant="body2" color="error">
                      {errors.genres.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </FormControl>
          <Button type="submit">{translations.form.nextButton}</Button>
          <Button type="button" onClick={() => reset()}>
            {translations.form.clearButton}
          </Button>
        </form>
      </FormContainer>
    </Box>
  );
};

export default Form;
