//material UI
import { Grid, Stack, Skeleton, Rating } from "@mui/material";

export default function SkeletonCard() {
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          sx={{
            borderRadius: "7px",
            height: { xs: "250px", sm: "400px" },
          }}
        />

        <Rating
          name="customized-10"
          defaultValue={0}
          max={10}
          style={{ margin: "auto", marginTop: "10px" }}
          sx={{
            "& .MuiRating-icon": {
              fontSize: { xs: "13px", sm: "inherit" },
            },
          }}
        />

        <Skeleton
          variant="text"
          height={24}
          width={150}
          style={{ margin: "auto", marginTop: "10px" }}
        />
        <Skeleton
          variant="text"
          width={80}
          height={25}
          style={{ margin: "auto", marginTop: "10px" }}
        />
      </Stack>
    </Grid>
  );
}
