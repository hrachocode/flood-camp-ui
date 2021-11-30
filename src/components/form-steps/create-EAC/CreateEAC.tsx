import {
  Grid,
  InputLabel,
  TextField,
  Button,
  SelectChangeEvent,
  CircularProgress,
  Typography,
} from "@mui/material";
import Dashboard, { ISignature } from "../../../pages/dashboard/Dashboard";
import Title from "../../texts/Title";
import {
  colorForText,
  DatePickerStyles,
  TextStyles,
} from "../create-station/createStation.styles";
import { ChangeEvent, useState } from "react";
import { postCreateEAC } from "../../../config/api/api.service";
import { useHistory } from "react-router-dom";

interface IForm extends ISignature {
  eacStartDateOfCreation: string;
  eacEndDateOfCreation: string;
  eacAmountOfMwt: number;
}

const today = new Date().toISOString().split("T")[0];

const initialState: IForm = {
  eacStartDateOfCreation: today,
  eacEndDateOfCreation: today,
  eacAmountOfMwt: 0,
};

const CreateEAC: React.FC = () => {
  const [form, setForm] = useState<IForm>(initialState);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const changeHandler = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ): void =>
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

  async function submitForm() {
    setLoading(true);
    await postCreateEAC({
      creationEnergyStartDate: new Date(form.eacStartDateOfCreation),
      creationEnergyEndDate: new Date(form.eacEndDateOfCreation),
      energyAmount: form.eacAmountOfMwt,
    });
    setLoading(false);
    history.push("/");
  }

  return (
    <Dashboard>
      <Title text="Create EAC" />
      <Grid container gap={3}>
        <Grid container gap={3}>
          <Grid item>
            <InputLabel sx={{ color: colorForText }}>
              Start date of energy creation
            </InputLabel>
            <TextField
              type="date"
              sx={DatePickerStyles}
              value={form.eacStartDateOfCreation}
              name="eacStartDateOfCreation"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item>
            <InputLabel sx={{ color: colorForText }}>
              End date of energy creation
            </InputLabel>
            <TextField
              type="date"
              value={
                new Date(`${form.eacStartDateOfCreation}`).getTime() >
                new Date(`${form.eacEndDateOfCreation}`).getTime()
                  ? form.eacStartDateOfCreation
                  : form.eacEndDateOfCreation
              }
              sx={DatePickerStyles}
              name="eacEndDateOfCreation"
              inputProps={{
                min: form.eacStartDateOfCreation,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={changeHandler}
            />
          </Grid>
        </Grid>
        <Grid item>
          <InputLabel sx={{ color: colorForText }}>
            Amount of energy in MWh
          </InputLabel>
          <TextField
            value={form.eacAmountOfMwt}
            name="eacAmountOfMwt"
            onChange={changeHandler}
            type="number"
            sx={{
              ...TextStyles,
            }}
          />
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          sx={{ marginTop: "15px", color: "#fff" }}
        >
          <Typography></Typography>
          {loading && <Typography>Please wait</Typography>}
          {loading ? (
            <CircularProgress />
          ) : (
            <Button sx={{ border: "1px solid " }} onClick={submitForm}>
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default CreateEAC;
