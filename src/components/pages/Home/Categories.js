import { useState, useEffect, useCallback } from "react";

//next
import { useRouter } from "next/router";

//Next modified
import Link from "components/NextModified/Link";

//helpers
import axiosInstance from "helpers/axios";

//utils
import slugGenerator from "utils/slug_generator";

//material UI
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Avatar,
  CardHeader,
} from "@mui/material";

import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";

export function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCategories = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/genre/movie/list?language=${router.locale}`
      );
      setCategories(data.genres);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [router.locale, loading]);

  useEffect(() => {
    getCategories();
  }, [router.locale]);

  return (
    <Container>
      <br />
      <br />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          margin: "20px 0",
          color: "text.primary",
          textAlign: "center",
          position: "relative",
          //before
          "&:before": {
            backgroundColor: "var(--primaryColor)",
            borderRadius: "0.5rem",
            content: '" "',
            display: "none",
            height: " 0.625rem",
            left: "0",
            right: "0",
            position: "absolute",
            top: "-1.875rem",
            transform: "-1.875rem",
            webkitTransform: "-1.875rem",
            mozTransform: "-1.875rem",
            msTransform: "-1.875rem",
            width: " 3.125rem",
            display: "block",
            margin: "auto",
          },
        }}
      >
        {router.locale === "en" ? "Categories" : "Categorias"}
      </Typography>
      <Typography
        variant="body"
        sx={{
          fontWeight: "600",
          margin: "20px auto",
          color: "text.primary",
          textAlign: "center",
          display: "block",
        }}
      >
        {router.locale === "en"
          ? "Enjoy the best movies by category"
          : "Disfruta de las mejores películas por categoría"}
      </Typography>
      <br />

      <Grid container spacing={2}>
        {categories?.map((category, index) => (
          <Grid item xs={6} md={4} key={category.id}>
            <CategoryCard category={category} index={index} router={router} />
          </Grid>
        ))}
        <Grid item xs={6} md={4}>
          <Card>
            <CardActionArea component={Link} href={`/movies`}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: `var(--primaryColor)` }}
                    aria-label="recipe"
                  >
                    <LocalMoviesOutlinedIcon />
                  </Avatar>
                }
                title={
                  router.locale === "en"
                    ? "See all movies"
                    : "Ver todas las películas"
                }
              />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

function CategoryCard({ category, index, router }) {
  return (
    <Card variant="outlined">
      <CardActionArea
        component={Link}
        href={`/categories/${slugGenerator(category.name.toLowerCase())}/${
          category.id
        }`}
      >
        <CardHeader
          sx={{
            background: `${
              router.route === `/categories/[slug]/[id]` &&
              parseInt(router.query.id) === parseInt(category.id) &&
              `var(--category--${index})`
            }`,
          }}
          avatar={
            <Avatar
              sx={{ bgcolor: `var(--category--${index})` }}
              aria-label="recipe"
            >
              {category.name[0]}
            </Avatar>
          }
          title={category.name}
        />
      </CardActionArea>
    </Card>
  );
}
