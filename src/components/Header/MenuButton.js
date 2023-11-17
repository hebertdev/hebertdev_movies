import { useState, useEffect, useCallback } from "react";

//next
import { useRouter } from "next/router";

//Next modified
import Link from "components/NextModified/Link";

//helpers
import axiosInstance, { urlImageProfile } from "helpers/axios";
import { getToken } from "helpers/auth";

//utils
import slugGenerator from "utils/slug_generator";

//material UI
import {
  Box,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import MenuIcon from "@mui/icons-material/Menu";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import InstallMobileOutlinedIcon from "@mui/icons-material/InstallMobileOutlined";

import LogoutIcon from "@mui/icons-material/Logout";

export default function MenuButton({
  color,
  mode,
  colorMode,
  theme,
  user,
  supportsPWA,
  handleOnClickInstallPwa,
}) {
  const [open, setOpen] = useState(false);
  const [openAcordion, setOpenAcordion] = useState(false);
  return (
    <>
      {user ? (
        <Button
          sx={{ color: color, marginLeft: "15px" }}
          onClick={() => setOpen(!open)}
          startIcon={
            <Avatar
              color="inherit"
              sx={{ width: "30px", height: "30px" }}
              src={urlImageProfile(user.avatar.tmdb.avatar_path)}
            />
          }
          endIcon={<MenuIcon />}
        ></Button>
      ) : (
        <IconButton onClick={() => setOpen(!open)}>
          <MenuIcon sx={{ color: color }} />
        </IconButton>
      )}

      <SwipeableDrawer
        disableSwipeToOpen={true}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        anchor="right"
        sx={{
          overflowX: "hidden",
        }}
      >
        <Categories
          setOpen={setOpen}
          openAcordion={openAcordion}
          setOpenAcordion={setOpenAcordion}
          mode={mode}
          colorMode={colorMode}
          theme={theme}
          user={user}
          supportsPWA={supportsPWA}
          handleOnClickInstallPwa={handleOnClickInstallPwa}
        />
      </SwipeableDrawer>
    </>
  );
}

function Categories({
  setOpen,
  openAcordion,
  setOpenAcordion,
  colorMode,
  theme,
  user,
  supportsPWA,
  handleOnClickInstallPwa,
}) {
  let router = useRouter();
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getCategories();
  // }, [router.locale, getCategories]);

  // const getCategories = useCallback(async () => {
  //   if (loading) return;
  //   try {
  //     setLoading(true);
  //     const { data } = await axiosInstance.get(
  //       `/genre/movie/list?language=${router.locale}`
  //     );
  //     setCategories(data.genres);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // }, [router.locale, loading]);

  function handleClickButtonDarkMode() {
    colorMode.toggleColorMode();
    setOpen(false);
  }

  async function handleLogout() {
    try {
      await axiosInstance.delete(`/authentication/session`, {
        data: {
          session_id: getToken(),
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Toolbar>
        <Typography
          sx={{
            fontFamily: '"CaeciliaLTStd",sans-serif',
            color: "inherit",
            fontWeight: "bold",
            color: "var(--colorHeader)",
            textAlign: "center",
            display: "block",
            width: "100%",
          }}
        >
          MENU
        </Typography>
      </Toolbar>
      <Box
        sx={{
          flexGrow: 1,
          margin: "auto",
          padding: "0 10px ",
          userSelect: "none",
          overflowX: "hidden",
        }}
      >
        {user && (
          <Accordion sx={{ minWidth: "260px" }} expanded={false}>
            <AccordionSummary
              component={Link}
              href={`/perfil`}
              onClick={() => setOpen(false)}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{ width: "30px", height: "30px" }}
                  src={urlImageProfile(user.avatar.tmdb.avatar_path)}
                />
                <Typography sx={{ marginLeft: "10px" }}>
                  {router.locale === "en" ? "Profile" : "Perfil"}
                </Typography>
              </Box>
            </AccordionSummary>
          </Accordion>
        )}
        <Accordion sx={{ minWidth: "260px" }} expanded={false}>
          <AccordionSummary
            component={Link}
            href={`/`}
            onClick={() => setOpen(false)}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: "30px", height: "30px" }}>
                <HomeOutlinedIcon />
              </Avatar>
              <Typography sx={{ marginLeft: "10px" }}>
                {router.locale === "en" ? "Home" : "Inicio"}
              </Typography>
            </Box>
          </AccordionSummary>
        </Accordion>
        <Accordion sx={{ minWidth: "260px" }} expanded={false}>
          <AccordionSummary
            component={Link}
            href={`/movies`}
            onClick={() => setOpen(false)}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: "30px", height: "30px" }}>
                <LocalMoviesOutlinedIcon />
              </Avatar>
              <Typography sx={{ marginLeft: "10px" }}>
                {router.locale === "en" ? "Movies" : "Películas"}
              </Typography>
            </Box>
          </AccordionSummary>
        </Accordion>
        <Accordion sx={{ minWidth: "260px" }} expanded={false}>
          <AccordionSummary onClick={handleClickButtonDarkMode}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: "30px", height: "30px" }}>
                {theme.palette.mode === "dark" ? (
                  <Brightness5OutlinedIcon />
                ) : (
                  <Brightness4OutlinedIcon />
                )}
              </Avatar>
              <Typography sx={{ marginLeft: "10px" }}>
                <>
                  {theme.palette.mode === "dark"
                    ? `${router.locale === "en" ? "Light mode" : "Modo claro"}`
                    : `${router.locale === "en" ? "Dark mode" : "Modo oscuro"}`}
                </>
              </Typography>
            </Box>
          </AccordionSummary>
        </Accordion>
        <ButtonInstall
          router={router}
          supportsPWA={supportsPWA}
          handleOnClickInstallPwa={handleOnClickInstallPwa}
        />
        {user && (
          <Accordion sx={{ minWidth: "260px" }} expanded={false}>
            <AccordionSummary onClick={handleLogout}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ width: "30px", height: "30px" }}>
                  <LogoutIcon />
                </Avatar>
                <Typography sx={{ marginLeft: "10px" }}>
                  {router.locale === "en" ? "Logout" : "Cerrar sesión"}
                </Typography>
              </Box>
            </AccordionSummary>
          </Accordion>
        )}
        <Accordion
          sx={{ minWidth: "260px" }}
          expanded={openAcordion}
          onClick={() => setOpenAcordion(!openAcordion)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginLeft: "10px" }}>
                {" "}
                {router.locale === "en" ? "Categories" : "Categorías"}{" "}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {loading && "cargando categorias..."}
              {categories?.map((category, index) => (
                <ListItem key={index}>
                  <ListItemButton
                    component={Link}
                    href={`/categories/${slugGenerator(
                      category.name.toLowerCase()
                    )}/${category.id}`}
                    onClick={() => setOpen(false)}
                    sx={{
                      background: `${
                        router.route === `/categories/[slug]/[id]` &&
                        parseInt(router.query.id) === parseInt(category.id) &&
                        `var(--category--${index})`
                      }`,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          width: "30px",
                          height: "30px",
                          background: `var(--category--${index})`,
                        }}
                      >
                        {category.name[0]}
                      </Avatar>
                      <Typography sx={{ marginLeft: "6px" }}>
                        {category.name}
                      </Typography>
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}

function ButtonInstall({ router, supportsPWA, handleOnClickInstallPwa }) {
  if (!supportsPWA) return null;
  return (
    <Accordion sx={{ minWidth: "260px" }} expanded={false}>
      <AccordionSummary onClick={handleOnClickInstallPwa}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ width: "30px", height: "30px" }}>
            <InstallMobileOutlinedIcon />
          </Avatar>
          <Typography sx={{ marginLeft: "10px" }}>Instalar app</Typography>
        </Box>
      </AccordionSummary>
    </Accordion>
  );
}
