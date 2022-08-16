import { useRouter } from "next/router";

//material UI
import { Container, Typography, Box, Divider, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <br />
      <Divider sx={{ border: "1px solid rgba(255,255,255,.05)" }} />
      <Container
        sx={{ padding: "30px 0", display: { xs: "block", sm: "flex" } }}
      >
        <Box
          flexGrow={1}
          sx={{
            display: { xs: "flex", sm: "block" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: "inherit" }}>
              Hebertdev Movies
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: "inherit" }}
            >
              {router.locale === "en" ? (
                <>
                  All rights reserved © {new Date().getFullYear()} | hebertdev
                </>
              ) : (
                <>
                  Todos los derechos reservados © {new Date().getFullYear()} |
                  hebertdev
                </>
              )}
            </Typography>
            <br />
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: "inherit" }}
            >
              {router.locale === "en"
                ? "The data comes from The Movie Database"
                : "Los datos provienen de The Movie Database."}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", height: "40px" }}>
          <Box sx={{ marginTop: "15px" }}>
            <IconButton
              component="a"
              href="https://hebertdev.space"
              target="_blank"
            >
              <LanguageIcon color="primary" />
            </IconButton>
            <IconButton
              component="a"
              href="https://github.com/hebertdev"
              target="_blank"
            >
              <GitHubIcon color="primary" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/hebertdev/"
              target="_blank"
            >
              <LinkedInIcon color="primary" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.instagram.com/hebertdev1/"
              target="_blank"
            >
              <InstagramIcon color="primary" />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.youtube.com/channel/UCvVxuO28XPe-fC6khHyAA_Q"
              target="_blank"
            >
              <YouTubeIcon color="primary" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </>
  );
}
