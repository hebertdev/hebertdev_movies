//next
import Image from "next/image";

//next modified
import Link from "components/NextModified/Link";

//helpers
import { urlImageW300 } from "helpers/axios";

//utils
import slugGenerator from "utils/slug_generator";

//material UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Rating, Grid, Box } from "@mui/material";

export default function MovieCard({ movie }) {
  return (
    <Grid item xs={6} md={3}>
      <Card
        sx={{ maxWidth: 300, background: "transparent" }}
        variant="contained"
      >
        <CardActionArea
          component={Link}
          href={`/movies/${slugGenerator(
            movie?.name ? movie?.name : movie?.title
          )}/${movie?.id}`}
        >
          {movie?.poster_path ? (
            <>
              <CardMedia
                sx={{
                  borderRadius: "7px",
                  height: { xs: "250px", sm: "400px" },
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Image
                    src={urlImageW300(
                      movie?.poster_path
                        ? movie?.poster_path
                        : movie?.backdrop_path
                    )}
                    layout="fill"
                    objectFit="cover"
                    alt={movie?.name ? movie?.name : movie?.title}
                    quality={30}
                  />
                </div>
              </CardMedia>
            </>
          ) : (
            <Box
              sx={{
                height: { xs: "250px", sm: "400px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "inherit",
                background: "var(--primaryColor)",
                textAlign: "center",
              }}
            >
              {movie?.name ? movie?.name : movie?.title}
            </Box>
          )}

          <CardContent>
            <Rating
              name="customized-10"
              value={movie?.vote_average}
              max={10}
              sx={{
                "& .MuiRating-icon": {
                  fontSize: { xs: "13px", sm: "inherit" },

                  color: `${
                    movie?.vote_average > 5.5
                      ? "var(--primaryColor)"
                      : "#dc3545"
                  }`,
                },
              }}
            />
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: "center", color: "inherit" }}
            >
              {movie?.name ? movie?.name : movie?.title}
            </Typography>
            <Typography
              component="p"
              variant="caption"
              sx={{ textAlign: "center", color: "var(--primaryColor)" }}
            >
              {movie?.release_date
                ? movie?.release_date
                : movie?.first_air_date}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
