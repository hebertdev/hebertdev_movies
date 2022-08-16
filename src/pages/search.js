import { useState, useEffect } from "react";

//next
import { useRouter } from "next/router";

//helpers
import axiosInstance from "helpers/axios";

//components
import { Banner } from "components/pages/SearchPage.js";
import MovieCard from "components/MovieCard";
import SkeletonCard from "components/SkeletonCard.js";

//material UI
import { Container, Grid, Button } from "@mui/material";

export default function SearchPage() {
  const [results, setResults] = useState(null);
  const [movie, setMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  let router = useRouter();
  let queri = router.query.query;

  function handleSubmit(text) {
    router.push(`/search?query=${text}`);
  }

  useEffect(() => {
    async function getResults() {
      if (!queri) return;
      try {
        setResults(null);
        const { data } = await axiosInstance.get(
          `/search/movie?query=${queri}&language=${router.locale}&page=1`
        );
        setResults(data.results);
        setTotalPages(data.total_pages);
        setPage(data.page + 1);
        setMovie(data.results[0]);
      } catch (error) {
        console.log(error);
      }
    }

    if (queri) {
      getResults();
    }
  }, [queri, router.locale]);

  const handleGetMoreMovies = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/search/movie?query=${queri}&language=${router.locale}&page=${page}`
      );
      setResults([...results, ...data.results]);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Banner queri={queri} handleSubmit={handleSubmit} movie={movie} />
      <Container>
        <br />

        {queri && (
          <>
            <Grid container spacing={3}>
              {results?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
              {loading && (
                <>
                  {loading &&
                    [...Array(8)].map((e, i) => <SkeletonCard key={i} />)}
                </>
              )}
            </Grid>
            {!loading && (
              <>
                {page <= totalPages && (
                  <Button
                    sx={{ margin: "auto", marginTop: "20px", display: "block" }}
                    variant="outlined"
                    onClick={handleGetMoreMovies}
                  >
                    {router.locale === "en" ? "Show more" : "mostrar más"}
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}
