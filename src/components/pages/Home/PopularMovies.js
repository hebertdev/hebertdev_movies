import { useState, useEffect, useCallback } from "react";

//next
import { useRouter } from "next/router";

//helpers
import axiosInstance from "helpers/axios";

//components
import MovieCard2 from "components/MovieCard/MovieCard2";

//material UI
import { Container, Typography, Box } from "@mui/material";

export function PopularMovies() {
  let router = useRouter();
  const [popularMovies, setPopularMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const getPopularMovies = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/discover/movie?sort_by=popularity.desc&language=${router.locale}`
      );
      setPopularMovies(data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [router.locale, loading]);

  useEffect(() => {
    getPopularMovies();
  }, [router.locale]);

  useEffect(() => {
    var $carrousel = document.querySelector("#carrousel");
    setShow(true);
    if (popularMovies) {
      if (show) {
        var interval;
        if ($carrousel) {
          var step = 1;
          const start = () => {
            if (show) {
              interval = setInterval(() => {
                $carrousel.scrollLeft = $carrousel.scrollLeft + step;

                if (
                  parseInt($carrousel.scrollLeft) + 1 ===
                  $carrousel.scrollWidth - $carrousel.clientWidth
                ) {
                  step = -1;
                } else if ($carrousel.scrollLeft === 0) {
                  step = 1;
                }
              }, 12);
            } else {
              console.log("se limpia");
              clearInterval(interval);
            }
          };

          const stop = () => {
            clearInterval(interval);
          };

          $carrousel.addEventListener("mouseover", stop);
          $carrousel.addEventListener("mouseout", start);

          start();
        }
      }
    }

    return function cleanup() {
      setShow(false);
      clearInterval(interval);
    };
  }, [popularMovies, show]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        width: "100%",
        background:
          "linear-gradient(transparent, rgb(3 115 186 / 13%) , #faaf001f,  transparent)!important",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <br />
        <br />
        <Container>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "600",
              margin: "20px 0",
              textAlign: "center",
              color: "text.primary",
            }}
          >
            {router.locale === "en" ? "Popular Movies" : "Lo mas popular"}
          </Typography>
        </Container>
        <br />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            padding: "0px",
            height: "auto",
            minWidth: "100%",
            overflowY: "hidden",
            overflowX: "auto",
            transition: "all 0.5s ease",
            "&::-webkit-scrollbar-thumb": {
              background: "transparent !important",
            },
            "&::-webkit-scrollbar": {
              width: "10px" /* Tamaño del scroll en vertical */,
              height: "10px",
              cursor: "pointer",
              transition: "all 0.5s ease",
            },
            "&:hover": {
              "&::-webkit-scrollbar-thumb": {
                background: "var(--primaryColor) !important",
                cursor: "pointer",
              },
            },
          }}
          id="carrousel"
        >
          {popularMovies?.map((movie) => (
            <Box
              key={movie.id}
              sx={{
                margin: "10px",
              }}
            >
              <MovieCard2 movie={movie} />
            </Box>
          ))}
        </Box>
        <br />
        <br />
        <br />
      </Box>
    </Box>
  );
}
