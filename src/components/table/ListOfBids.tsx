import {
  Grid,
  Table,
  TableContainer,
  TableHead,
  Typography,
  TableCell,
} from "@mui/material";
import { SxProps } from "@mui/system";
import DashboardWrapper from "../dashboard-wrapper/DashboardWrapper";
import { colorForText } from "../form-steps/create-station/createStation.styles";
import { TableContainerStyles } from "./ListOfEacs";

const GridStyles: SxProps = {
  minHeight: 500,
  maxWidth: 500,
  backgroundColor: "rgba(0,0,0,0.6)",
  padding: "16px",
  color: colorForText,
  flexDirection: "column",
};

const headers = {
  asks: ["Type", "MWh", "Price"],
  bids: ["Price", "MWh", "Type"],
};

const ListOfBids = () => {
  return (
    <DashboardWrapper>
      <Grid container justifyContent="space-around">
        <Grid container sx={GridStyles}>
          <Grid item>
            <Typography variant="h4">Asks</Typography>
          </Grid>
          <Grid item>
            <TableContainer sx={TableContainerStyles}>
              <Table>
                <TableHead>
                  {headers.asks.map((i) => (
                    <TableCell key={i}>{i}</TableCell>
                  ))}
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container sx={GridStyles}>
          <Grid item>
            <Typography variant="h4">Bids</Typography>
          </Grid>
          <Grid item>
            <TableContainer sx={TableContainerStyles}>
              <Table>
                <TableHead>
                  {headers.bids.map((i) => (
                    <TableCell key={i}>{i}</TableCell>
                  ))}
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </DashboardWrapper>
  );
};

export default ListOfBids;
