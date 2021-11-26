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
} from "@mui/material";
import { SxProps } from "@mui/system";
import React from "react";
import { TableContainerStyles } from "../../ListOfEacs";
import { IExchagneModal, ModalStyles } from "../ExchangeModal";

interface IBidsModal extends Pick<IExchagneModal, "isOpen" | "setIsOpen"> {}

interface IBidTableData {
  userName: string;
  bid: number;
  id?: number;
}

const tableHeaders: string[] = ["User Name", "Bid", "Accept/Reject"];

const data: IBidTableData[] = [
  {
    userName: "Gag",
    bid: 5000,
  },
  {
    userName: "Bob",
    bid: 6000,
  },
  {
    userName: "Harut",
    bid: 7000,
  },
];

const acceptRejectStyles: SxProps = {
  minWidth: "40px",
};

const BidsModal: React.FC<IBidsModal> = ({ isOpen, setIsOpen }) => {
  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={closeHandler}>
      <Box sx={ModalStyles}>
        <Grid container>
          <TableContainer component={Paper} sx={TableContainerStyles}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeaders.map((i) => (
                    <TableCell
                      size="medium"
                      key={i}
                      align={i === "Accept/Reject" ? "right" : "inherit"}
                    >
                      {i}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((i: IBidTableData, idx: number) => {
                  return (
                    <TableRow key={i.id ?? idx}>
                      <TableCell>{i.userName}</TableCell>
                      <TableCell>{i.bid}</TableCell>
                      <TableCell align="right">
                        <Button variant="text" sx={acceptRejectStyles}>
                          &#10004;
                        </Button>
                        <Button variant="text" sx={acceptRejectStyles}>
                          &times;
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button onClick={closeHandler}>Close</Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BidsModal;
