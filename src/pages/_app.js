import { useEffect, useContext, useState } from "react";

//next
import { Head } from "next/head";

//contexts
import DarkModeContext, { DarkModeProvider } from "contexts/DarkModeContext";

//components
import Header from "components/Header";
import Footer from "components/Footer";
import NextNProgress from "nextjs-progressbar";

//material ui
import { Box } from "@mui/material";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  //verified is pwa
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const handleOnClickInstallPwa = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  return (
    <>
      <NextNProgress color="#f9ab00" showOnShallow={false} height={4} />
      <DarkModeProvider>
        <AppData
          Component={Component}
          pageProps={pageProps}
          supportsPWA={supportsPWA}
          handleOnClickInstallPwa={handleOnClickInstallPwa}
        />
      </DarkModeProvider>
    </>
  );
}

function AppData({
  Component,
  pageProps,
  supportsPWA,
  handleOnClickInstallPwa,
}) {
  const { mode, colorMode, theme } = useContext(DarkModeContext);
  useEffect(() => {
    document.body.style.backgroundColor =
      theme.palette.mode === "light"
        ? "#f5f5f5"
        : theme.palette.background.default;
  }, [theme.palette.background.default, theme.palette.mode]);

  return (
    <>
      <Box
        sx={{
          width: "100%",

          bgcolor: `${
            theme.palette.mode === "light" ? "#f5f5f5" : "background.default"
          }`,
          color: "text.secondary",
          overflow: "auto",
        }}
      >
        <Header
          colorMode={colorMode}
          theme={theme}
          mode={mode}
          supportsPWA={supportsPWA}
          handleOnClickInstallPwa={handleOnClickInstallPwa}
        />
        <Component {...pageProps} />
        <Footer />
      </Box>
    </>
  );
}

export default MyApp;
