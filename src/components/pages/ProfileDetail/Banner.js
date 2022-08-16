//next
import { useRouter } from "next/router";

//helpers
import { urlImageW1900 } from "helpers/axios";

//materail UI/material UI
import { Box, Container } from "@mui/material";

export function Banner({ movie }) {
  let router = useRouter();
  return (
    <Box
      sx={{
        height: "60vh",
        minHeight: { xs: "50vh", sm: "50vh" },
        background: `${
          movie ? `url('${urlImageW1900(movie?.backdrop_path)}')` : ``
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
          background: "rgba(0,0,0,0.7)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          {router.locale === "en"
            ? "Hello, we are in development, here you can see your list of favorite movies and more"
            : "Hola, estamos en desarrollo, aqui puedes ver tu lista de peliculas favoritas y mas"}
        </Container>
      </Box>
    </Box>
  );
}
