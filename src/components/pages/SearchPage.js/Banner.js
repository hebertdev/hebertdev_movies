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
          <Typography variant="h4" sx={{ margin: "20px 0", color: "white" }}>
            {movie ? (
              <>
                {router.locale === "en"
                  ? `Results for: ${queri}`
                  : `Resultados para: ${queri}`}
              </>
            ) : (
              <>
                {router.locale === "en"
                  ? `No results found for: ${queri}`
                  : `No se encontraron resultados para: ${queri}`}
              </>
            )}
          </Typography>
          <FormSearch handleSubmit={handleSubmit} queri={queri} movie={movie} />
        </Container>
      </Box>
    </Box>
  );
}

function FormSearch({ handleSubmit, queri, movie }) {
  const [inputText, setInputText] = useState("");
  const [prevText, setPrevText] = useState("");

  let inputxd = useRef(null);

  useEffect(() => {
    if (queri) {
      setInputText(queri);
    } else {
      setInputText("");
    }
  }, [queri]);

  async function onSubmitSearch(e) {
    e.preventDefault();
    setPrevText(inputText);
    if (inputText === prevText) return;
    await handleSubmit(inputText);
    inputxd.current.blur();
  }

  return (
    <Box component="form" onSubmit={onSubmitSearch}>
      <TextField
        placeholder="Buscar una película, serie o programa de televisión..."
        autoComplete="off"
        sx={{
          border: "1px solid var(--primaryColor)",
          color: "white",
          borderRadius: "10px",
          "& input": {
            color: "white",
          },
          //input colors
        }}
        fullWidth
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        inputRef={inputxd}
      />
    </Box>
  );
}
