//components
import MovieCard from "components/MovieCard";
import SkeletonCard from "components/SkeletonCard.js";

//materail UI
import { Grid, Container, Button } from "@mui/material";

export function Movies({ movies, loading }) {
  return (
    <Container sx={{ margin: "20px auto" }}>
      <Grid container spacing={3}>
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}

        {loading && [...Array(8)].map((e, i) => <SkeletonCard key={i} />)}
      </Grid>
    </Container>
  );
}
