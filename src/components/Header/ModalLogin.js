import { useState, useEffect } from "react";
//next
import { useRouter } from "next/router";

//next modified
import LinkRoute from "components/NextModified/Link";

//helpers
import axiosInstance from "helpers/axios";
import { setToken } from "helpers/auth";

//material UI
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Avatar,
  TextField,
  Grid,
  Link,
  Typography,
  Alert,
  Hidden,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

export default function ModalLogin() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleOpen = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Hidden smUp>
        <IconButton onClick={handleOpen} color="inherit">
          <LoginIcon />
        </IconButton>
      </Hidden>
      <Hidden smDown>
        <Button
          variant="contained"
          size="small"
          sx={{ marginLeft: "15px" }}
          onClick={handleOpen}
          startIcon={<LoginIcon />}
        >
          {router.locale === "en" ? "Log In" : "Iniciar sesión"}
        </Button>
      </Hidden>
      <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogContent>
          <LoginModal router={router} />
        </DialogContent>
      </Dialog>
    </>
  );
}

function LoginModal({ router }) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButtob] = useState(true);
  const [error, setError] = useState(false);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
    let objectValues = { ...values, [prop]: e.target.value };
    if (objectValues.username.length > 1 && objectValues.password.length > 1) {
      setDisableButtob(false);
    } else {
      setDisableButtob(true);
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError(false);
      setLoading(true);
      const { data: token } = await axiosInstance.get(
        "/authentication/token/new"
      );
      const { data } = await axiosInstance.post(
        `/authentication/token/validate_with_login`,
        {
          username: values.username,
          password: values.password,
          request_token: token.request_token,
        }
      );
      const { data: session_id } = await axiosInstance.post(
        "authentication/session/new",
        {
          request_token: data.request_token,
        }
      );
      setToken(session_id.session_id);
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {router.locale === "en" ? "Log In" : "Iniciar sesión"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label={router.locale === "en" ? "Username" : "Usuario"}
          name="username"
          type="text"
          autoComplete="off"
          onChange={handleChange("username")}
          value={values.username}
        />
        <FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" required>
            {router.locale === "en" ? "Password" : "Contraseña"}
          </InputLabel>
          <OutlinedInput
            required
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        {!disableButton ? (
          <>
            {loading ? (
              <LoadingButton
                loading
                variant="outlined"
                size="large"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </LoadingButton>
            ) : (
              <Button
                disableElevation
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, mb: 2 }}
                disabled={disableButton}
              >
                Iniciar Sesión
              </Button>
            )}
          </>
        ) : (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, opacity: 0, height: 0 }}
            disabled={disableButton}
          ></Button>
        )}

        {error && (
          <>
            <Alert severity="error">
              {router.locale === "en"
                ? "wrong credentials"
                : "Credenciales incorrectas"}
            </Alert>
            <br />
          </>
        )}

        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link
              variant="body2"
              sx={{ color: "inherit", textDecoration: "underline" }}
              component={LinkRoute}
              href="https://www.themoviedb.org/signup?language=es"
              target="_blank"
            >
              {router.locale === "en" ? "Sign Up" : "Registrarse"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
