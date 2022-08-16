import { useState, useRef } from "react";

//next
import { useRouter } from "next/router";

//material UI
import { IconButton, Dialog, InputBase, Paper } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function ButtonSearch({ color }) {
  const router = useRouter();
  const [openModalSearch, setOpenModalSearch] = useState(false);
  const [search, setSearch] = useState("");

  let inputSearchRef = useRef(null);

  const handleCloseModalSearch = () => {
    setOpenModalSearch(false);
  };

  const handleOpenModalSearch = async () => {
    await setOpenModalSearch(true);
    inputSearchRef.current.focus();
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.length === 0) {
      return;
    }

    router.push(`/search?query=${search}`);
    inputSearchRef.current.blur();
    setSearch("");
    setOpenModalSearch(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenModalSearch}>
        <SearchOutlinedIcon sx={{ color: color }} />
      </IconButton>
      <Dialog open={openModalSearch} onClose={handleCloseModalSearch}>
        <Paper
          sx={{
            p: "3px",
            display: "flex",
            alignItems: "center",
          }}
          component="form"
          variant="outlined"
          onSubmit={handleSearch}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, p: 1 }}
            placeholder={`${
              router.locale === "es" ? "Buscar..." : "Search..."
            }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            inputRef={inputSearchRef}
          />

          <IconButton type="submit">
            <SearchOutlinedIcon />
          </IconButton>
        </Paper>
      </Dialog>
    </>
  );
}
