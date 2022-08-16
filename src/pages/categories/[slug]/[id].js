import { useState, useEffect } from "react";

//next
import { useRouter } from "next/router";

//next modified
import HeadTags from "components/NextModified/HeaderTags";

//helpers
import axiosInstance, { urlImageW1900 } from "helpers/axios";

//components
import { Banner, Movies } from "components/pages/CategoryDetail";
import { Categories } from "components/pages/Home";

//material UI
import { Button } from "@mui/material";

export default function Category({ name, category }) {
  let router = useRouter();
  const { id } = router.query;

  return (
    <>
      <HeadTags
        title={
          router.locale === "en"
            ? `THE BEST FILMS OF ${name.toUpperCase()}`
            : `LÁS MEJORES PELICULAS DE ${name.toUpperCase()}`
        }
        description={
          router.locale === "en"
            ? "Enjoy the best movies offered by this category"
            : "Disfruta de las mejores películas que ofrece esta categoría"
        }
        picture={
          category?.results && urlImageW1900(category.results[0].backdrop_path)
        }
      />
      {category && (
        <>
          <CategoryContent
            id={id}
            name={name}
            category={category}
            router={router}
          />
        </>
      )}
    </>
  );
}

function CategoryContent({ id, name, category, router }) {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(2);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMovies(category?.results);
    setTotalPages(category?.total_pages);
  }, [router.locale, id, category?.results, category?.total_pages]);

  const handleGetMoreMovies = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/discover/movie?with_genres=${id}&language=${router.locale}&page=${page}`
      );
      console.log(data);
      setMovies([...movies, ...data.results]);
      setTotalPages(data.total_pages);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!movies && <div style={{ height: "100vh" }}></div>}
      {movies && (
        <>
          <Banner movie={movies[0]} />
          <Movies movies={movies} loading={loading} />

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
          <br />
          <br />
          <Categories />
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  var datos = null;
  try {
    const { data } = await axiosInstance.get(
      `/discover/movie?with_genres=${context.query.id}&language=${context.locale}&page=1`
    );
    datos = data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      name: context.query.slug,
      category: datos,
    },
  };
}
