import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  ButtonStyles,
  colorForText,
  TextStyles,
} from "../../components/form-steps/create-station/createStation.styles";
import Title from "../../components/texts/Title";
import { postSignIn, postSignUp } from "../../config/api/api.service";
import {
  MainContainerStyles,
  MainInnerContainer,
} from "../dashboard/dashboard.styles";
import { injectAccessTokenTOLocalStorage, statics } from "./auth.utils";

interface IAuthForm {
  email: string;
  password: string;
}

const Auth = () => {
  const [info, setInfo] = useState(statics.login);
  const [form, setForm] = useState<IAuthForm>({
    email: "",
    password: "",
  });
  const history = useHistory();
  const isOnLogin = useRef<boolean>(history.location.pathname === "/login");

  useEffect(() => {
    if (isOnLogin.current) {
      setInfo(statics.login);
    } else {
      setInfo(statics.signUp);
    }
  }, [isOnLogin]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void =>
    void setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const authHandler = async () => {
    if (form.email && form.password) {
      if (!isOnLogin.current) {
        await postSignUp({
          username: form.email,
          password: form.password,
        });
        history.push("/login");
      } else {
        const res: { accessToken: string } = await postSignIn({
          username: form.email,
          password: form.password,
        });
        if (res?.accessToken) {
          injectAccessTokenTOLocalStorage(res.accessToken);
          history.push("/");
        }
      }
    }
  };

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

export default Auth;
