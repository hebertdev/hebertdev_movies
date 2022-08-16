import { useState, useEffect, useRef } from "react";

//next
import { useRouter } from "next/router";

//helpers
import { urlImageW1900 } from "helpers/axios";

//materail UI/material UI
import { Box, TextField, Container, Typography } from "@mui/material";

import SadWallpaper from "assets/original.png";

export function Banner({ movie, handleSubmit, queri }) {
  let router = useRouter();
  return (
    <Box
      sx={{
        height: movie ? "50vh" : "100vh",
        minHeight: { xs: "50vh", sm: "50vh" },
        background: `${
          movie
            ? `url('${urlImageW1900(movie?.backdrop_path)}')`
            : `url('${SadWallpaper.src}')`
        } no-repeat center center fixed`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
          <br />
          <Typography
            variant="h1"
            sx={{
              fontSize: "50px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "20px",
            }}
          >
            {router.locale === "es" ? "Bienvenido" : "Welcome"}
          </Typography>
          <Typography variant="h4" sx={{ margin: "20px 0", color: "white" }}>
            {router.locale === "en"
              ? "Millions of movies to explore"
              : "Millones de películas para explorar"}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
