import { Container, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import CreateCompany from "../../components/form-steps/create-company/CreateCompnay";
import CreateEAC from "../../components/form-steps/create-EAC/CreateEAC";
import CreateStation from "../../components/form-steps/create-station/CreateStation";
import Navbar from "../../components/navbar/Navbar";
import {
  MainContainerStyles,
  MainGridStyles,
  MainInnerContainer,
} from "./dashboard.styles";

export interface ISignature {
  [x: string]: string | number;
}

const Dashboard: React.FC = () => {
  const location = useLocation();

  const findContent = (path: string): JSX.Element | undefined => {
    switch (path) {
      case "/":
        return <CreateCompany />;
      case "/create-station":
        return <CreateStation />;
      case "/create-eac":
        return <CreateEAC />;
      default:
        break;
    }
  };

  return (
    <Container sx={MainContainerStyles}>
      <Navbar />
      <Grid
        container
        sx={MainGridStyles}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          sx={MainInnerContainer}
          direction="column"
          justifyContent="space-between"
        >
          <Grid container>{findContent(location.pathname)}</Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
