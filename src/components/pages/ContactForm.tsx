import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useThemeCustom } from "../../theme/ThemeContext";
import { useLanguage } from "../LanguageContext";
import emailjs from 'emailjs-com';
import { emailRegex } from "../Regex/RegexUtil";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { translations } = useLanguage();
  const { handleSubmit, control, reset, formState: { errors }, trigger } = useForm<FormData>();
  const { darkMode } = useThemeCustom();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData: Record<string, unknown> = {
      name: data.name,
      email: data.email,
      message: data.message,
    };
  
    emailjs.send(
      'service_wma0xio',
      'template_lxky6sl', 
      formData,
      'c_brlNASItcnI_Ar8' 
    ).then(() => {
      reset();
      setIsEmailSent(true);
      setTimeout(() => {
        setIsEmailSent(false);
      }, 3000); 
    }).catch((err) => {
      console.error('FAILED...', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
      } else if (err.request) {
        console.error('Request:', err.request);
      } else {
        console.error('Error:', err.message);
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          marginTop: "20%",
          width: "40%",
          textAlign: "left",
        }}
      >
        <Typography variant="h4">
          {translations.Contact.header}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ marginBottom: 2 }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: translations.Contact.name.required,
                minLength: {
                  value: 2,
                  message: translations.Contact.name.minLength,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={translations.Contact.name.NameLabel}
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
          <Box sx={{ marginBottom: 2 }}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: translations.Contact.email.required,
                pattern: {
                  value: emailRegex, 
                  message: translations.Contact.email.Email,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={translations.Contact.email.EmailLabel} 
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  onBlur={() => trigger("email")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("email");
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              rules={{
                required: translations.Contact.message.required,
                minLength: {
                  value: 10,
                  message: translations.Contact.message.minLength,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={translations.Contact.message.MessageLabel}
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.message}
                  helperText={errors.message ? errors.message.message : ""}
                  onBlur={() => trigger("message")}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("message");
                  }}
                />
              )}
            />
          </Box>
          <Button type="submit" color="primary">
            {translations.form.submitButton}
          </Button>
          <Typography 
            variant="body1" 
            sx={{
              marginTop: 2, 
              color: "green",
              opacity: isEmailSent ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
              animation: `${isEmailSent ? 'fadeIn' : ''} 0.5s`,
            }}
          >
            {translations.Contact.emailSentMessage}
          </Typography>
        </form>
      </Box>
      <Box
        sx={{
          borderLeft: `2px solid ${darkMode ? "#ffffff" : "#000000"}`,
          height: "400px",
          marginTop: "20%",
        }}
      />
      <Box component="img"
        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2dpc3FqYjJzdmZjMjA3NXl5YWg0emIxdjJoZGU2N2NmYnJpcjBrNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/e57rLyk3DYvwAxJ5W5/giphy.gif"
        alt="GIF"
        sx={{
          width: "35%",
          height: "35%",
          marginTop: "18%",
        }}
      />
    </Box>
  );
};

export default ContactForm;
