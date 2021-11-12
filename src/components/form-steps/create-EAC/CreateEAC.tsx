import {
  Grid,
  InputLabel,
  TextField,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { ISignature } from "../../../pages/dashboard/Dashboard";
import Title from "../../texts/Title";
import {
  colorForText,
  DatePickerStyles,
  TextStyles,
} from "../create-station/createStation.styles";
import { ChangeEvent, useState } from "react";
import { postCreateEAC } from "../../../config/api/api.service";

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

  const changeHandler = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ): void =>
    setForm((prev) => {
      console.log( e.target.value);
      
      return { ...prev, [e.target.name]: e.target.value };
    });

  async function submitForm() {
    console.log(form);
    await postCreateEAC({
      creationEnergyStartDate: new Date(form.eacStartDateOfCreation),
      creationEnergyEndDate: new Date(form.eacEndDateOfCreation),
      energyAmount: form.eacAmountOfMwt,
    });
  }

  return (
    <>
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
        <Grid container justifyContent="flex-end" sx={{ marginTop: "15px" }}>
          <Button onClick={submitForm}>Submit</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateEAC;
