import { AppBar, Typography, Grid, Button } from "@mui/material";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getBalance } from "../../config/api/api.service";
import { updateBalance } from "../../config/redux/main.slice";
import { NavbarLinksWrapper, NavbarMainStyle } from "./navbar.styles";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    history.push("/login");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await getBalance();
      if (res) {
        dispatch(updateBalance(res));
      }
    })();
  }, []);

  const data = useSelector((state: any) => state.main);

  return (
    <AppBar sx={NavbarMainStyle}>
      <Grid container alignItems="center" sx={NavbarLinksWrapper}>
        <Link to="/">
          <Typography variant="h6">EACs</Typography>
        </Link>
        <Link to="/create-company">
          <Typography variant="h6">Create Company</Typography>
        </Link>
        <Link to="/create-station">
          <Typography variant="h6">Create Station</Typography>
        </Link>{" "}
        <Link to="/create-eac">
          <Typography variant="h6">Create EAC</Typography>
        </Link>
      </Grid>
      <Grid item display="flex" alignItems="center">
        <Typography color="#1976d2" mr="10px">
          Balance
        </Typography>
        <Typography mr="100px">{data.balance}</Typography>
      </Grid>
      <Grid item>
        <Button sx={{ height: "100%" }} onClick={logoutHandler}>
          Logout
        </Button>
      </Grid>
    </AppBar>
  );
};

export default Navbar;
