import { useState, useEffect } from "react";

//next
import { useRouter } from "next/router";

//next modified
import HeadTags from "components/NextModified/HeaderTags";

//components
import { Banner, Movies } from "components/pages/Movies";
import SkeletonCard from "components/SkeletonCard.js";

//material UI
import { Button, Grid, Container } from "@mui/material";

//helpers
import axiosInstance, { urlImageW1900 } from "helpers/axios";

export default function MoviesPage({ data }) {
  const router = useRouter();

  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(2);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    setMovies(data.results);
    setTotalPages(data.total_pages);
  }, [router.locale, data.results, data.total_pages]);

  return (
    <>
      <HeadTags
        title={
          router.locale === "en"
            ? "Movies | hebertdev.space"
            : "Películas | hebertdev.space"
        }
        description={
          router.locale === "en"
            ? "Welcome, Millions of movies to explore"
            : "Bienvenido, Millones de películas para explorar"
        }
        picture={urlImageW1900(data.results[0].backdrop_path)}
      />
      {movies ? (
        <AllMovies
          movies={movies}
          setMovies={setMovies}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          router={router}
        />
      ) : (
        <div
          style={{ width: "100%", height: "100vh", background: "#e7a7509c" }}
        ></div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  var datos = null;
  try {
    const { data } = await axiosInstance.get(
      `discover/movie?language=${context.locale}&page=1`
    );
    datos = data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      data: datos,
    },
  };
}

function AllMovies({
  movies,
  setMovies,
  setPage,
  setTotalPages,
  page,
  totalPages,
  router,
}) {
  const [loading, setLoading] = useState(false);

  const handleGetMoreMovies = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `discover/movie?language=${router.locale}&page=${page}`
      );
      setMovies([...movies, ...data.results]);
      setPage(page + 1);
      setTotalPages(data.total_pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <Banner movie={movies[0]} />
      <Movies movies={movies} />
      <Container>
        <Grid container spacing={3}>
          {loading && (
            <>
              {loading && [...Array(8)].map((e, i) => <SkeletonCard key={i} />)}
            </>
          )}
        </Grid>
      </Container>
      {!loading && (
        <>
          <br />
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
  );
}
