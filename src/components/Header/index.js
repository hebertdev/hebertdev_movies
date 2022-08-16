import { useState, useEffect } from "react";

//next modified
import RouterLink from "components/NextModified/Link";

//helpers
import { getToken } from "helpers/auth";

//componets
import MenuButton from "./MenuButton";
import SearchBar from "./Search";
import ChangeLanguage from "./ChangeLanguage";
import ButtonSearch from "./ButtonSearch";
import ModalLogin from "./ModalLogin";

//Materil UI
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Hidden,
} from "@mui/material";

import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";

//extra assets
import LogoDark from "assets/movie_logo_dark_2.png";
import LogoLight from "assets/movie_logo_light_2.png";
import axiosInstance from "helpers/axios";

export default function Header({
  mode,
  colorMode,
  theme,
  supportsPWA,
  handleOnClickInstallPwa,
}) {
  const [scrolling, setScrolling] = useState(false);
  const [user, setUser] = useState(null);
  const [headerStyles, setHeaderStyle] = useState({
    background: "transparent",
    transition: "all 0.3s ease",
    color: "white",
  });

  const [logoStyler, setLogoStyler] = useState({
    display: "block !important",
    height: "41px",
    background: `${
      theme.palette.mode === "dark"
        ? `url(${LogoDark.src}) no-repeat`
        : `url(${LogoLight.src}) no-repeat`
    }`,
    backgroundSize: "contain",
  });

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axiosInstance.get("/account");
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (getToken()) {
      getUser();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setScrolling(true);
        setHeaderStyle({
          background:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.9)"
              : "#090909",
          transition: "all 0.3s ease",
          color: "text.primary",
          backdropFilter: "blur(20px)",
        });
      } else {
        setScrolling(false);
        setLogoStyler({
          display: "block !important",
          height: "41px",
          background: `${
            theme.palette.mode === "light" && scrolling === false
              ? `url(${LogoDark.src}) no-repeat`
              : theme.palette.mode === "dark" && scrolling === false
              ? `url(${LogoDark.src}) no-repeat`
              : ""
          }`,
          backgroundSize: "contain",
        });
      }
    });

    if (scrolling) {
      setHeaderStyle({
        background:
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.9)"
            : "#090909",
        transition: "all 0.3s ease",
        color: "text.primary",
        backdropFilter: "blur(20px)",
      });
      setLogoStyler({
        display: "block !important",
        height: "41px",
        background: `${
          theme.palette.mode === "dark"
            ? `url(${LogoDark.src}) no-repeat`
            : `url(${LogoLight.src}) no-repeat`
        }`,
        backgroundSize: "contain",
      });
    } else {
      setHeaderStyle({
        background: "transparent",
        transition: "all 0.3s ease",
        color: "white",
      });
      setLogoStyler({
        display: "block !important",
        height: "41px",
        background: `${
          theme.palette.mode === "light" && scrolling === false
            ? `url(${LogoDark.src}) no-repeat`
            : theme.palette.mode === "dark" && scrolling === false
            ? `url(${LogoDark.src}) no-repeat`
            : ""
        }`,
        backgroundSize: "contain",
      });
    }
  }, [mode, scrolling, theme.palette.mode]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={headerStyles} elevation={0}>
        <Container sx={{ padding: "10px " }}>
          <Toolbar disableGutters variant="dense">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: "600" }}>
                <Typography
                  component={RouterLink}
                  href="/"
                  sx={logoStyler}
                ></Typography>
              </Typography>
            </Box>
            <Hidden smUp>
              <ButtonSearch color={headerStyles.color} />
            </Hidden>
            <Hidden smDown>
              <SearchBar />
            </Hidden>
            <ChangeLanguage />
            <Hidden smDown>
              <IconButton
                sx={{ ml: 1 }}
                color="inherit"
                onClick={colorMode.toggleColorMode}
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness5OutlinedIcon />
                ) : (
                  <Brightness4OutlinedIcon />
                )}
              </IconButton>
            </Hidden>
            {!user && <ModalLogin />}
            <MenuButton
              color={headerStyles.color}
              mode={mode}
              colorMode={colorMode}
              theme={theme}
              user={user}
              supportsPWA={supportsPWA}
              handleOnClickInstallPwa={handleOnClickInstallPwa}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
