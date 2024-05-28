import { Grow, Typography } from "@mui/material";
import { useLanguage } from "../LanguageContext";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import MuiTimeline from "@mui/lab/Timeline";
export default function Timeline() {
  const { translations } = useLanguage();
  return (
    <MuiTimeline position="alternate" sx={{ width: "100%" }}>
      <Grow in={true} timeout={1000}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              {translations.home.timeline1}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              {translations.home.description1}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Grow>
      <Grow in={true} timeout={1500}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              {translations.home.timeline2}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              {translations.home.description2}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Grow>
      <Grow in={true} timeout={2000}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" color="secondary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              {translations.home.timeline3}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              {translations.home.description3}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Grow>
      <Grow in={true} timeout={2500}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              {translations.home.timeline4}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              {translations.home.description4}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Grow>
    </MuiTimeline>
  );
}
