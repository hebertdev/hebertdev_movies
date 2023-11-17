import { useEffect, useState } from "react";
//next
import { useRouter } from "next/router";

//helpers
import axiosInstance from "helpers/axios";

//next modified
import ButtonLink from "components/NextModified/ButtonLink";

//helpers
import { urlImageW1900 } from "helpers/axios";

//utils
import slugGenerator from "utils/slug_generator";

//materail UI
import { Box, Container, Typography, Rating, Button } from "@mui/material";

export function Banner({ movie }) {
  let router = useRouter();
  const [genr, setGenr] = useState(null);
  const { id } = router.query;
  // useEffect(() => {
  //   async function getCategories() {
  //     try {
  //       const { data } = await axiosInstance.get(
  //         `/genre/movie/list?language=${router.locale}`
  //       );
  //       const gen = data.genres.filter((genre) => genre.id === parseInt(id));
  //       setGenr(gen[0]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getCategories();
  // }, [router.locale, movie, id]);

  return (
    <Box
      sx={{
        height: "100vh",
        minHeight: { xs: "100vh", sm: "100vh" },
        background: `${
          movie
            ? `url('${urlImageW1900(movie?.backdrop_path)}')`
            : "var(--primaryColor)"
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
          background: "rgba(0,0,0,0.8)",
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
              fontSize: { xs: "20px", sm: "40px" },
              fontWeight: "bold",
              color: "var(--primaryColor)",
            }}
          >
            {router.locale === "es" ? (
              <>
                LÁS MEJORES PELICULAS DE <br /> {genr?.name.toUpperCase()}
              </>
            ) : (
              <>
                THE BEST FILMS OF <br /> {genr?.name.toUpperCase()}
              </>
            )}
          </Typography>
          <Typography sx={{ color: "white", marginBottom: "30px" }}>
            {"////////////////////////"}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "10px",
            }}
          >
            {movie?.name ? movie?.name : movie?.title}
          </Typography>
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                color: "white",
              }}
            >
              {movie.overview.length > 200
                ? movie.overview.substring(0, 200) + "..."
                : movie.overview}
            </Typography>
            <CustomizedRating movie={movie} />
            <Button
              variant="outlined"
              component={ButtonLink}
              href={`/movies/${slugGenerator(
                movie.name ? movie.name : movie.title
              )}/${movie.id}`}
            >
              {router.locale === "es" ? "MÁS INFO" : "MORE INFO"}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export function CustomizedRating({ movie }) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend" sx={{ color: "white" }}>
        {movie.vote_count} votos
      </Typography>

      <Rating
        name="customized-10"
        defaultValue={movie.vote_average}
        max={10}
        sx={{ "& .MuiRating-icon": { color: "var(--primaryColor)" } }}
      />
      <br />
      <br />
      <br />
    </Box>
  );
}
