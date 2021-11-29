import {
  Modal,
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { SxProps } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  confirmBidToEAC,
  getBindedAsks,
  makeBid,
} from "../../../../config/api/api.service";
import { upadateEac } from "../../../../config/redux/main.slice";
import {
  colorForText,
  TextStyles,
} from "../../../form-steps/create-station/createStation.styles";
import { TableContainerStyles, VariantOfEACsType } from "../../ListOfEacs";
import { IExchagneModal, ModalStyles } from "../exchange-section/ExchangeModal";

interface IBidsModal extends Pick<IExchagneModal, "isOpen" | "setIsOpen"> {
  id: number;
  variant: VariantOfEACsType;
}

interface IBidTableData {
  userName: string;
  price: number;
  id: number;
  eacsId?: number;
}

const tableHeaders: string[] = ["User Name", "Bid", "Accept"];

const acceptRejectStyles: SxProps = {
  minWidth: "40px",
};

const BidsModal: React.FC<IBidsModal> = ({
  id,
  isOpen,
  setIsOpen,
  variant,
}) => {
  const [data, setData] = useState<IBidTableData[]>();
  const [price, setPrice] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await getBindedAsks(id);
      if (res) {
        setData(res);
        if (res.length) {
          setPrice(res[0].price);
        }
      }
    })();
  }, [id]);

  const closeHandler = () => {
    setIsOpen(false);
  };

  const confirmHandler = async (bidId: number) => {
    const res = await confirmBidToEAC(bidId);
    if (res) {
      dispatch(upadateEac({ type: "userEACs", item: res }));
      setIsOpen(false);
    }
  };

  const makeBidHandler = async () => {
    const res = await makeBid({ price, eacsId: id });
    if (res) {
      setData((prev: any) => {
        if (prev) {
          return [res, ...prev];
        } else {
          return [res];
        }
      });
    }
  };

  return (
    <Modal open={isOpen} onClose={closeHandler}>
      <Box sx={ModalStyles}>
        <Grid container>
          {variant === "allEACs" && (
            <>
              <TextField
                type="number"
                sx={TextStyles}
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
                label="BId"
                variant="outlined"
              />
              <Button
                variant="text"
                sx={acceptRejectStyles}
                onClick={makeBidHandler}
                disabled={data && price <= data?.[0]?.price}
              >
                &#10004;
              </Button>
            </>
          )}
          {data && data.length ? (
            <TableContainer component={Paper} sx={TableContainerStyles}>
              <Table>
                <TableHead>
                  <TableRow>
                    {tableHeaders.map((i) => {
                      if (variant === "allEACs" && i === "Accept") return null;
                      return (
                        <TableCell
                          size="medium"
                          key={i}
                          align={i === "Accept" ? "right" : "inherit"}
                        >
                          {i}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((i: IBidTableData, idx: number) => {
                    return (
                      <TableRow key={i.eacsId ?? idx}>
                        <TableCell>{i.userName}</TableCell>
                        <TableCell>{i.price}</TableCell>
                        {variant !== "allEACs" && (
                          <TableCell align="right">
                            <Button
                              variant="text"
                              sx={acceptRejectStyles}
                              onClick={() => confirmHandler(i.id)}
                            >
                              &#10004;
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Grid container justifyContent="center">
              <Typography
                variant="h6"
                sx={{ justifyContent: "center", color: colorForText }}
              >
                No bids yet
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button onClick={closeHandler}>Close</Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BidsModal;
