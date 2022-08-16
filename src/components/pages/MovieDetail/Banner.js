import { useState } from "react";
//next
import { useRouter } from "next/router";
import Image from "next/image";

//helpers
import { urlImageW300, urlImageW1900 } from "helpers/axios";

//components
import ButtonPlayTrailer from "./ButtonPlayTrailer";

//materail UI
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Hidden,
} from "@mui/material";

import Rating from "@mui/material/Rating";

export function Banner({ movie, directors }) {
  let router = useRouter();
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
          background: "rgba(0,0,0,0.73)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container sx={{ display: { xs: "block", sm: "flex" } }}>
          <Picture movie={movie} />
          <MovieInformation
            movie={movie}
            directors={directors}
            router={router}
          />
        </Container>
      </Box>
    </Box>
  );
}

function Picture({ movie }) {
  return (
    <>
      <div>
        <picture className="pictureMovie">
          <Image
            src={urlImageW300(movie?.poster_path)}
            alt={movie?.title}
            objectFit="cover"
            layout="fill"
            priority
          />
        </picture>
      </div>
      <style>
        {`

        .pictureMovie {
          min-width: 380px;
          max-width:380px;
          height:70vh;
          max-height:600px;
          overflow: hidden;
          display: block;
          border-radius: 10px;
          position: relative;
        }
          .pictureMovie img {
            width: 100%;
            height: 100%;
            objectFit: cover;
          }
          @media (max-width: 768px) {
            .pictureMovie{
              display:none;
            }
          }
        `}
      </style>
    </>
  );
}

function MovieInformation({ movie, directors, router }) {
  return (
    <>
      <Box sx={{ marginLeft: { xs: "0", sm: "30px" } }}>
        <Typography
          variant="h1"
          sx={{
            color: "white",
            fontSize: { xs: "23px", sm: "30px" },
            fontWeight: "600",
            marginTop: "20px",
          }}
        >
          {movie?.name ? movie?.name : movie?.title}
        </Typography>
        <Typography variant="caption" sx={{ color: "white" }}>
          {movie.adult ? "+18" : "+13"} | {movie.release_date} |
          {movie.genres.map((gen) => (
            <span key={gen.id}> {gen.name}, </span>
          ))}
        </Typography>
        <CustomizedRating movie={movie} router={router} />
        {movie.tagline && (
          <>
            <Typography variant="caption" sx={{ color: "white" }}>
              {movie.tagline}
            </Typography>
            <br />
            <br />
          </>
        )}
        <Typography variant="button" sx={{ color: "white" }}>
          {router.locale === "es" ? "VISTA GENERAL" : "OVERVIEW"}
        </Typography>
        <br />
        <Typography
          variant="body2"
          sx={{
            width: "100%",
            color: "white",
          }}
        >
          {movie.overview.length > 200
            ? movie.overview.substring(0, 200) + "..."
            : movie.overview}
          {movie.overview.length > 200 && (
            <ButtonDialogOverview router={router} overview={movie?.overview} />
          )}
        </Typography>

        <ButtonPlayTrailer movie={movie} />
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {directors?.map((director) => (
            <Typography
              variant="body2"
              sx={{ color: "white", marginRight: "20px", marginBottom: "20px" }}
              key={director.id}
            >
              <b>{director.name}</b> <br />
              Director
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  );
}

function ButtonDialogOverview({ router, overview }) {
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Button size="small" sx={{ padding: 0 }} onClick={handleClickOpen}>
        {router.locale === "en" ? "More" : "Ver más"}
      </Button>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>
          {router.locale === "en" ? "Overview" : "Vista general"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">{overview}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {router.locale === "es" ? "CERRAR" : "CLOSE"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export function CustomizedRating({ movie, router }) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        marginBottom: "16px",
      }}
    >
      <Typography component="legend" sx={{ color: "white" }}>
        {movie.vote_count} {router.locale === "es" ? "VOTOS" : "VOTES"}
      </Typography>

      <Rating
        name="customized-10"
        value={movie?.vote_average}
        max={10}
        sx={{
          "& .MuiRating-icon": {
            color: `${
              movie?.vote_average > 5.5 ? "var(--primaryColor)" : "#dc3545"
            }`,
          },
        }}
      />
    </Box>
  );
}
