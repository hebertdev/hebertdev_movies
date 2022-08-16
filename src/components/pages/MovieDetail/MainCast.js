import { useState, useEffect } from "react";

//next
import { useRouter } from "next/router";

//next
import Image from "next/image";

//helpers
import axiosInstance, { urlImageW300 } from "helpers/axios";

//material UI
import {
  CardActionArea,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export function MainCast({ movie, setDirectors }) {
  const [actors, setActors] = useState(null);
  let router = useRouter();

  useEffect(() => {
    async function getActors() {
      try {
        const { data } = await axiosInstance.get(
          `/movie/${movie.id}/credits?language=${router.locale}`
        );
        setActors(data.cast);
        setDirectors(data.crew.filter((crew) => crew.job === "Director"));
      } catch (error) {
        console.log(error);
      }
    }
    getActors();
  }, [router.locale, movie.id, setDirectors]);

  useEffect(() => {
    if (movie) {
      let boxActoris = document.querySelector("#main-cast");
      boxActoris.scrollTo(0, 0);
    }
  }),
    [movie];

  return (
    <Box>
      <Typography variant="h4" sx={{ color: "inherit", margin: "20px 0" }}>
        {router.locale === "es" ? "Reparto Principal" : "Main Cast"}
      </Typography>
      <Box
        id="main-cast"
        sx={{
          width: "100%",
          display: "flex",
          overflow: "auto",
          margin: "20px 0",
        }}
      >
        {actors?.map((actor, index) => (
          <Actor key={index} actor={actor} />
        ))}
      </Box>
    </Box>
  );
}

function Actor({ actor }) {
  return (
    <Card
      sx={{ minWidth: 150, background: "transparent", marginRight: "30px" }}
      variant="contained"
    >
      <CardActionArea>
        <CardMedia
          sx={{ borderRadius: "7px", height: { xs: "200px", sm: "250px" } }}
        >
          <div
            style={{
              position: "relative",
              height: "100%",
              width: "100%",
            }}
          >
            <Image
              src={
                actor.profile_path
                  ? urlImageW300(actor.profile_path)
                  : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
              }
              layout="fill"
              objectFit="cover"
              alt={actor.name}
              quality={30}
            />
          </div>
        </CardMedia>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {actor.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
