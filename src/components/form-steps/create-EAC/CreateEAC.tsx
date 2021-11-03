import { Grid, InputLabel, TextField } from "@mui/material";
import { IForm } from "../../../pages/dashboard/Dashboard";
import Title from "../../texts/Title";
import {
  colorForText,
  DatePickerStyles,
  TextStyles,
} from "../create-station/createStation.styles";

interface ICreateEACProps
  extends Partial<Pick<IForm, "startDateOfCreation" | "endDateOfCreation">> {
  changeHandler: (e: any) => void;
}

const CreateEAC: React.FC<ICreateEACProps> = ({
  startDateOfCreation,
  endDateOfCreation,
  changeHandler,
}) => {
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
              value={startDateOfCreation}
              name="startDateOfCreation"
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
                new Date(`${startDateOfCreation}`).getTime() >
                new Date(`${endDateOfCreation}`).getTime()
                  ? startDateOfCreation
                  : endDateOfCreation
              }
              sx={DatePickerStyles}
              name="endDateOfCreation"
              inputProps={{
                min: startDateOfCreation,
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
            type="number"
            sx={{
              ...TextStyles,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateEAC;
