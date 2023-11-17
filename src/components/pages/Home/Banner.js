import { useState, useEffect } from "react";

//next
import { useRouter } from "next/router";

//next modified
import ButtonLink from "components/NextModified/ButtonLink";

//helpers
import axiosInstance, { urlImageW1900 } from "helpers/axios";

//materail UI
import { Box, Container, Typography, TextField, Button } from "@mui/material";

export function Banner({ data }) {
  const [trendingMovie, setTrendingMovie] = useState(null);

  let router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      setTrendingMovie(data.results[0]);
    }
  }, [data]);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: trendingMovie
          ? `url('${urlImageW1900(trendingMovie?.backdrop_path)}')`
          : "var(--backgroundColor)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          background: "rgba(0,0,0,0.7)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Typography
            variant="h1"
            sx={{
              fontSize: "50px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "30px",
            }}
          >
            {router.locale === "es" ? "Bienvenido" : "Welcome"}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: "35px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "30px",
            }}
          >
            {router.locale === "es" ? (
              <>
                Millones de películas, programas de televisión y personas por
                descubrir.
              </>
            ) : (
              <>Millions of movies, TV shows and people discover.</>
            )}
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{ fontSize: "20px", border: "1.3px solid" }}
            component={ButtonLink}
            href="/movies"
          >
            {router.locale === "es" ? "Explorar ahora" : "Explore now"}
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
