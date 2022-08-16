import { useState, useEffect, useCallback } from "react";

//next
import { useRouter } from "next/router";

//helpers
import axiosInstance from "helpers/axios";

//components
import MovieCard from "components/MovieCard";

//material UI
import { Container, Typography, Grid } from "@mui/material";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export function TrendingMovies() {
  const [value, setValue] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [validTime, setValidTime] = useState("day");
  const [loading, setLoading] = useState(false);

  let router = useRouter();

  const getTrendingMovies = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/trending/movie/${validTime}?language=${router.locale}`
      );
      setTrendingMovies(data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [router.locale, loading]);

  useEffect(() => {
    getTrendingMovies();
  }, [router.locale, validTime]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setValidTime("day");
    }
    if (newValue === 1) {
      setValidTime("week");
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          margin: "20px 0",
          color: "text.primary",
        }}
      >
        {router.locale === "es" ? "En tendencia" : "Trending Movies"}
      </Typography>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "15px" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={router.locale === "es" ? "hoy" : "today"}
            sx={{ color: "text.primary" }}
          />
          <Tab
            label={router.locale === "es" ? "esta semana" : "this week"}
            sx={{ color: "text.primary" }}
          />
        </Tabs>
      </Box>
      {value === 0 && (
        <Grid container spacing={3}>
          {trendingMovies?.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </Grid>
      )}
      {value === 1 && (
        <Grid container spacing={3}>
          {trendingMovies?.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </Grid>
      )}
    </Container>
  );
}
