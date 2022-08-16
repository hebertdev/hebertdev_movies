import { useState } from "react";

//next
import { useRouter } from "next/router";

//next modified
import ButtonLink from "components/NextModified/ButtonLink";

//material ui
import { Button, Menu } from "@mui/material";

import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";

export default function ChangeLanguage() {
  let router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        sx={{ color: "inherit" }}
        startIcon={<TranslateOutlinedIcon />}
        onClick={handleClick}
      >
        {router.locale === "en" ? "EN" : "ES"}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {router.locales.map((locale, index) => (
          <ButtonLocale
            key={index}
            locale={locale}
            router={router}
            handleClose={handleClose}
          />
        ))}
      </Menu>
    </div>
  );
}

function ButtonLocale({ locale, router, handleClose }) {
  function handlePush() {
    if (router.locale === locale) {
      handleClose();
      return;
    }
  }

  return (
    <>
      {router.locale === locale ? (
        <Button
          sx={{ margin: "0 10px", color: "inherit", display: "flex" }}
          startIcon={<TranslateOutlinedIcon />}
          onClick={handlePush}
          variant={router.locale === locale ? "outlined" : "text"}
        >
          {locale}
        </Button>
      ) : (
        <Button
          component={ButtonLink}
          href={`${router.asPath}`}
          locale={locale}
          sx={{ margin: "0 10px", color: "inherit", display: "flex" }}
          startIcon={<TranslateOutlinedIcon />}
          variant={router.locale === locale ? "outlined" : "text"}
          onClick={() => {
            handleClose();
          }}
        >
          {locale}
        </Button>
      )}
    </>
  );
}
