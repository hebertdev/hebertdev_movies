import { useState, useEffect } from "react";

//next
import { useRouter } from "next/router";

//helpers
import axiosInstance from "helpers/axios";

//components
import MovieCard from "components/MovieCard";
//material UI
import { Box, Grid, Typography } from "@mui/material";

export function Recommendations({ movie }) {
  const [recommendations, setRecommendations] = useState(null);
  let router = useRouter();

  useEffect(() => {
    async function getRecommendations() {
      try {
        const { data } = await axiosInstance.get(
          `/movie/${movie.id}/similar?language=${router.locale}`
        );
        setRecommendations(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    getRecommendations();
  }, [router.locale, movie.id]);
  return (
    <Box>
      <Typography variant="h4" sx={{ margin: "20px 0" }}>
        {router.locale === "es"
          ? "También te puede interesar"
          : "You may also like"}
      </Typography>
      <Grid container spacing={3}>
        {recommendations?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Box>
  );
}
