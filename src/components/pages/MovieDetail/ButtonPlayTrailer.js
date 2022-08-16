import { useEffect, useState } from "react";

//next
import { useRouter } from "next/router";

import { RWebShare } from "react-web-share";

//react youtube
import YouTube from "react-youtube";

//materail UI
import { Dialog, DialogContent, Button } from "@mui/material";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import ShareIcon from "@mui/icons-material/Share";

export default function ButtonPlayTrailer({ movie }) {
  let router = useRouter();

  const [open, setOpen] = useState(false);
  const [videos, setVideos] = useState(null);
  const [trailer, setTrailer] = useState(null);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (movie) {
      setVideos(movie.videos.results);
      if (movie.videos.results.length > 0) {
        if (movie.videos && movie.videos.results) {
          const trailer = movie.videos.results.find(
            (vid) => vid.type === "Official Trailer"
          );
          setTrailer(trailer ? trailer : movie.videos.results[0]);
        }
      }
    }

    return function cleanup() {
      setVideos(null);
      setTrailer(null);
    };
  }, [movie]);

  useEffect(() => {
    if (trailer) {
      if (router.query.trailer === "true") {
        openModal();
      }
    }
  }, [trailer, router.query.trailer]);

  const [rutita, setRutita] = useState(null);

  useEffect(() => {
    setRutita(window.location.href);
  }, [movie]);

  return (
    <>
      <>
        {trailer && (
          <Button
            startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
            variant="contained"
            sx={{ marginTop: "20px", marginRight: "10px" }}
            onClick={openModal}
          >
            {router.locale === "es" ? "VER TRAILER" : "WATCH TRAILER"}
          </Button>
        )}

        <RWebShare
          data={{
            text: movie.overview,
            url: rutita,
            title: movie.title ? movie.title : movie.name,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <Button
            startIcon={<ShareIcon />}
            variant="outlined"
            sx={{ marginTop: "20px" }}
          >
            {router.locale === "es" ? "COMPARTIR" : "SHARE"}
          </Button>
        </RWebShare>

        {trailer && (
          <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
            <DialogContent sx={{ background: "black", padding: "0" }}>
              {trailer && (
                <YouTube
                  videoId={trailer.key}
                  opts={{
                    width: "100%",
                    height: "500",
                    playerVars: {
                      autoplay: 1,
                      controls: 1,
                      cc_load_policy: 0,
                      fs: 0,
                      iv_load_policy: 0,
                      modestbranding: 0,
                      rel: 0,
                      showinfo: 0,
                    },
                  }}
                />
              )}
            </DialogContent>
          </Dialog>
        )}
      </>
    </>
  );
}
