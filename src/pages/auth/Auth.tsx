import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ButtonStyles,
  colorForText,
  TextStyles,
} from "../../components/form-steps/create-station/createStation.styles";
import Title from "../../components/texts/Title";
import {
  MainContainerStyles,
  MainInnerContainer,
} from "../dashboard/dashboard.styles";
import { statics } from "./auth.utils";

interface IAuthForm {
  email: string;
  password: string;
}

const Login = () => {
  const [info, setInfo] = useState(statics.login);
  const [form, setForm] = useState<IAuthForm>({
    email: "",
    password: "",
  });
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login") setInfo(statics.login);
    if (location.pathname === "/sign-up") setInfo(statics.signUp);
  }, [location.pathname]);

  const changeHandler = (e: any): void =>
    void setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const authHandler = () => {};

  return (
    <Container
      sx={{
        ...MainContainerStyles,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <Grid
        container
        sx={{
          ...MainInnerContainer,
          minHeight: 600,
          maxWidth: 550,
          borderRadius: "10px",
        }}
        direction="column"
        gap={5}
      >
        <Title text={info.title} />
        <TextField
          label="Enter email"
          sx={TextStyles}
          value={form.email}
          name="email"
          onChange={changeHandler}
        />
        <TextField
          label="Enter password"
          sx={TextStyles}
          value={form.password}
          name="password"
          onChange={changeHandler}
        />
        <Button
          sx={{ ...ButtonStyles, alignSelf: "center" }}
          onClick={authHandler}
        >
          {info.title}
        </Button>
        <Typography
          variant="subtitle1"
          sx={{
            color: colorForText,
            textAlign: "center",
            a: { color: "#fff" },
          }}
        >
          {info.preFixOfText} have an account?{" "}
          <Link to={info.path}>{info.toTitle}</Link>
        </Typography>
      </Grid>
    </Container>
  );
};

export default Login;
