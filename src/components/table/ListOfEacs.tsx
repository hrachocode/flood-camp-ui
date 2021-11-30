import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TablePagination,
  Typography,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import { SxProps } from "@mui/system";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEACsInAuctions, getEACs } from "../../config/api/api.service";
import { ICreateEAC, IChangeAskAuctionState } from "../../config/api/api.types";
import { setEacs } from "../../config/redux/main.slice";
import { RootState } from "../../config/redux/store";
import Dashboard from "../../pages/dashboard/Dashboard";
import { colorForText } from "../form-steps/create-station/createStation.styles";
import BidsSection from "./components/bids-section/BidsSection";
import OnExchangeSection from "./components/exchange-section/OnExchangeSection";

export interface IEAC extends ICreateEAC, IChangeAskAuctionState {
  id: number;
  isArchive: boolean;
}

export type VariantOfEACsType = "userEACs" | "allEACs";

export const TableContainerStyles: SxProps = {
  backgroundColor: "unset",
  th: { color: colorForText },
  td: { color: colorForText },
};

const ListOfEacs = () => {
  const data = useSelector((state: RootState) => state.main.eacs);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [variantOfEACs, setVariantOfEACs] =
    useState<VariantOfEACsType>("userEACs");
  const dispatch = useDispatch();

  const headersOfTable: string[] = useMemo(() => {
    return [
      "Id",
      "Start date of energy creation",
      "End date of energy creation",
      "Amount of energy in MWh",
      variantOfEACs === "userEACs" ? "Exchange Status" : "Ask",
      "Made Bids",
    ];
  }, [variantOfEACs]);

  useEffect(() => {
    (async () => {
      const res = await Promise.all([
        await getEACs(),
        await getAllEACsInAuctions(),
      ]);
      if (res && res.length) {
        dispatch(
          setEacs({
            userEACs: res[0],
            allEACs: res[1],
          })
        );
      }
    })();
  }, [dispatch]);

  return (
    <Dashboard>
      <Tabs
        value={variantOfEACs}
        onChange={(_, value) => setVariantOfEACs(value)}
      >
        <Tab sx={{ color: colorForText }} label="My EAC's" value={"userEACs"} />
        <Tab
          sx={{ color: colorForText }}
          label="Whole EAC's in auction"
          value={"allEACs"}
        />
      </Tabs>
      {data ? (
        <>
          <TableContainer component={Paper} sx={TableContainerStyles}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {headersOfTable.map((i) => {
                    return (
                      <TableCell size="medium" key={i}>
                        {i}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data[variantOfEACs] &&
                  data[variantOfEACs].length > 0 &&
                  data[variantOfEACs]
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((i: IEAC) => (
                      <TableRow key={i.id}>
                        <TableCell>{i.id}</TableCell>
                        <TableCell>
                          {new Date(i.creationEnergyStartDate).toDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(i.creationEnergyEndDate).toDateString()}
                        </TableCell>
                        <TableCell>{i.energyAmount}</TableCell>
                        <TableCell>
                          {variantOfEACs === "userEACs" ? (
                            <OnExchangeSection item={i} />
                          ) : (
                            i.price ?? 0
                          )}
                        </TableCell>
                        <TableCell>
                          <BidsSection item={i} variant={variantOfEACs} />
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={data?.[variantOfEACs]?.length ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => void setPage(newPage)}
            onRowsPerPageChange={(
              event: React.ChangeEvent<HTMLInputElement>
            ) => {
              setRowsPerPage(+event.target.value);
              setPage(0);
            }}
            sx={{ color: colorForText }}
          />
        </>
      ) : (
        <Grid container justifyContent="center">
          <Typography
            variant="h6"
            sx={{ justifyContent: "center", color: colorForText }}
          >
            Nothing to show yet
          </Typography>
        </Grid>
      )}
    </Dashboard>
  );
};

export default ListOfEacs;
