import { useState, useRef } from "react";

//next
import { useRouter } from "next/router";

//Materil UI
import { IconButton, Paper, InputBase } from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function SearchBar() {
  let router = useRouter();
  const [search, setSearch] = useState("");
  let searchRef = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.length === 0) {
      return;
    }
    router.push(`/search?query=${search}`);
    searchRef.current.blur();
    setSearch("");
  };
  return (
    <Paper
      variant="outlined"
      component="form"
      onSubmit={handleSearch}
      sx={{
        padding: "0",
        height: "40px",
        background: "inherit",
        color: "inherit",
        border: "1px solid var(--primaryColor)",
        marginRight: "15px",
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          height: "30px",
          color: "inherit",
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${router.locale === "es" ? "Buscar..." : "Search..."}`}
        size="small"
        inputRef={searchRef}
        autoComplete="off"
      />

      <IconButton type="submit" color="inherit">
        <SearchOutlinedIcon />
      </IconButton>

      {/*

          {loading ? (
            <IconButton type="button">
              <CircularProgress size="20px" />
            </IconButton>
          ) : (
            <IconButton type="submit">
              <SearchOutlinedIcon />
            </IconButton>
          )}
          */}
    </Paper>
  );
}
