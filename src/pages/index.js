//next
import { useRouter } from "next/router";

//next modified
import HeadTags from "components/NextModified/HeaderTags";

//helpers
import axiosInstance, { urlImageW1900 } from "helpers/axios";

//components
import {
  Banner,
  TrendingMovies,
  PopularMovies,
  Categories,
} from "components/pages/Home";

//material UI
import { Box, Divider } from "@mui/material";

export default function Home({ data }) {
  const router = useRouter();
  return (
    <>
      <HeadTags
        title={router.locale === "en" ? "Hebertdev TMDB " : "Hebertdev TMDB"}
        description={
          router.locale === "en"
            ? "Welcome, Millions of movies, TV shows and people discover. "
            : "Bienvenido, Millones de películas, programas de televisión y personas por descubrir."
        }
        picture={data?.results && urlImageW1900(data.results[0].backdrop_path)}
      />
      <Box>
        <Banner data={data} />
        <PopularMovies />
        <Divider sx={{ border: "1px solid rgba(255,255,255,.05)" }} />
        <TrendingMovies />
        <Categories />
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  var datos = null;
  try {
    const { data } = await axiosInstance.get(
      `/trending/movie/day?language=${context.locale}`
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
