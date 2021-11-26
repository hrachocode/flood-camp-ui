import { AppBar, Typography, Grid, Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { NavbarLinksWrapper, NavbarMainStyle } from "./navbar.styles";

const Navbar = () => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    history.push("/login");
  };

  return (
    <AppBar sx={NavbarMainStyle}>
      <Grid container alignItems="center" sx={NavbarLinksWrapper}>
        <Link to="/">
          <Typography variant="h6">My EACs</Typography>
        </Link>
        <Link to="/exchange">
          <Typography variant="h6">Exchange</Typography>
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
      <Grid item>
        <Button sx={{ height: "100%" }} onClick={logoutHandler}>
          Logout
        </Button>
      </Grid>
    </AppBar>
  );
};

export default Navbar;
