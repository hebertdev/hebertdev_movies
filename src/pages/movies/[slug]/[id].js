import { useState, useEffect } from "react";

//next
import Router, { useRouter } from "next/router";
import Error from "next/error";

//next modified
import HeadTags from "components/NextModified/HeaderTags";

//helpers
import axiosInstance, { urlImageW300, urlImageW1900 } from "helpers/axios";

//components
import {
  Banner,
  MainCast,
  Recommendations,
} from "components/pages/MovieDetail";

import { Categories } from "components/pages/Home";

//material UI
import { Container } from "@mui/material";

export default function MovieDetailPage({ data }) {
  const router = useRouter();
  const { id } = router.query;
  const [directors, setDirectors] = useState(null);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (data) {
      setMovie(data);
    }
    return function cleanup() {
      setMovie(null);
    };
  }, [id, router.locale, data]);

  if (movie === 404) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <HeadTags
        title={`${data?.title} | hebertdev.space`}
        description={data?.overview}
        url={router.asPath}
        picture={urlImageW1900(data?.backdrop_path)}
      />
      {movie && (
        <>
          <MovieDetail
            movie={movie}
            directors={directors}
            setDirectors={setDirectors}
          />
        </>
      )}
    </>
  );
}

function MovieDetail({ movie, directors, setDirectors }) {
  return (
    <>
      <Banner movie={movie} directors={directors} />
      <Container>
        <MainCast movie={movie} setDirectors={setDirectors} />
        <Recommendations movie={movie} />
      </Container>
      <Categories />
    </>
  );
}

export async function getServerSideProps(context) {
  var datos = null;

  try {
    const { data } = await axiosInstance.get(
      `/movie/${context.query.id}?language=${context.locale}&append_to_response=videos`
    );

    datos = data;
  } catch (error) {
    datos = error;
    if (error?.response?.status === 404) {
      context.res.statusCode = 404;
      datos = error?.response?.status;
    } else {
      datos = error;
    }
  }

  return {
    props: {
      data: datos,
    },
  };
}
