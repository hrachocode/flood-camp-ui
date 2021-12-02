import { Grid } from "@mui/material";
import DashboardWrapper from "../../components/dashboard-wrapper/DashboardWrapper";
import { MainGridStyles, MainInnerContainer } from "./dashboard.styles";

export interface ISignature {
  [x: string]: string | number | any;
}

const Dashboard: React.FC = ({ children }) => {
  return (
    <DashboardWrapper>
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
          <Grid container>{children}</Grid>
        </Grid>
      </Grid>
    </DashboardWrapper>
  );
};

export default Dashboard;
