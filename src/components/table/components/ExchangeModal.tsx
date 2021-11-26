import {
  Modal,
  Box,
  Grid,
  Typography,
  FormControl,
  TextField,
  Button,
  Switch,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { Dispatch, SetStateAction, useState } from "react";
import { changeEACAskAucitonState } from "../../../config/api/api.service";
import { IChangeAskAuctionState } from "../../../config/api/api.types";
import {
  colorForText,
  TextStyles,
} from "../../form-steps/create-station/createStation.styles";

export const ModalStyles: SxProps = {
  minHeight: 400,
  maxWidth: 600,
  width: "100%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#262A3D",
  borderRadius: "20px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

interface IExchangeForm {
  priceOfExchange: number;
}

export interface IExchagneModal {
  price: number;
  value: number;
  type: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setChecked: Dispatch<SetStateAction<boolean>>;
}

const ExchangeModal: React.FC<IExchagneModal> = ({
  isOpen,
  setIsOpen,
  setChecked,
  value,
  type,
  price,
}) => {
  const initFormState: IExchangeForm = {
    priceOfExchange: price ?? 0,
  };
  const [form, setForm] = useState<IExchangeForm>(initFormState);
  const [toggleExchange, setToggleExchange] = useState<boolean>(type);

  const closeHandler = () => {
    setForm(initFormState);
    setToggleExchange(type);
    setIsOpen(false);
  };

  const changeHandler = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async () => {
    const body: IChangeAskAuctionState = {
      price: form.priceOfExchange,
      isAsk: toggleExchange,
    };
    if (!toggleExchange) {
      body.isAsk = false;
      body.price = 0;
    }

    const res = await changeEACAskAucitonState(value, body);

    if (res) {
      setChecked(toggleExchange);
      setIsOpen(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={closeHandler}>
      <Box sx={ModalStyles}>
        <Grid container gap={3} flexDirection="column">
          <Grid item>
            <Typography variant="h6" sx={{ color: colorForText }}>
              Activate Exchange Status
            </Typography>
            <Switch
              checked={toggleExchange}
              onChange={() => setToggleExchange((prev) => !prev)}
            />
          </Grid>
          <Typography sx={{ color: colorForText }} variant="h6">
            Set Ask Price
          </Typography>

          <FormControl fullWidth>
            <TextField
              type="number"
              sx={TextStyles}
              value={form.priceOfExchange}
              onChange={changeHandler}
              disabled={!toggleExchange}
              name="priceOfExchange"
              label="Price"
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button onClick={closeHandler}>Cancel</Button>
          <Button onClick={submitHandler}>Submit</Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ExchangeModal;
