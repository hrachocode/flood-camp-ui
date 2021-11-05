import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { countries, energyTypes, regions } from "./ceateStation.utils";
import {
  colorForText,
  DatePickerStyles,
  SelectHalfStyles,
  SelectStyles,
  TextStyles,
} from "./createStation.styles";
import Title from "../../texts/Title";
import { IForm } from "../../../pages/dashboard/Dashboard";

interface ICreateStation {
  form: Partial<IForm>;
  changeHandler: (e: any) => void;
  error: any;
}

const CreateStation: React.FC<ICreateStation> = ({
  form: {
    stationDateOfExplotation,
    stationRegion,
    stationCountry,
    stationEnergyType,
    stationName,
    stationPlacement,
    stationSupport,
  },
  changeHandler,
  error,
}) => {
  const today = new Date();

  return (
    <>
      <Title text="Create Station" />
      <Grid container sx={{ gap: 2 }} direction={"column"}>
        <InputLabel id="energySelect" sx={{ color: colorForText }}>
          Type of energy
        </InputLabel>

        <Select
          labelId="energySelect"
          value={stationEnergyType}
          name={"stationEnergyType"}
          onChange={changeHandler}
          sx={SelectStyles}
          variant="filled"
        >
          {energyTypes.map((el, idx) => {
            return (
              <MenuItem value={el} key={idx}>
                {el}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          label="Station name"
          variant="filled"
          sx={TextStyles}
          value={stationName}
          onChange={changeHandler}
          name="stationName"
          error={error?.stationName}
        />
        <TextField
          label="Station placement"
          variant="filled"
          sx={TextStyles}
          value={stationPlacement}
          onChange={changeHandler}
          name="stationPlacement"
          error={error?.stationPlacement}
        />
        <TextField
          label=" Support to station from government"
          variant="filled"
          sx={TextStyles}
          value={stationSupport}
          name="stationSupport"
          onChange={changeHandler}
          error={error?.stationSupport}
        />
        <InputLabel sx={{ color: colorForText }}>
          Date of start exploitation
        </InputLabel>
        <TextField
          type="date"
          value={stationDateOfExplotation}
          sx={DatePickerStyles}
          name="stationDateOfExplotation"
          inputProps={{
            max: today.toISOString().split("T")[0],
          }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={changeHandler}
        />
        <Grid container>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="stationCountry" sx={{ color: colorForText }}>
                stationCountry
              </InputLabel>

              <Select
                labelId="stationCountry"
                value={stationCountry}
                name="stationCountry"
                onChange={changeHandler}
                sx={SelectHalfStyles}
                variant="filled"
              >
                {countries.map((el, idx) => {
                  return (
                    <MenuItem value={el} key={idx}>
                      {el}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="stationRegion" sx={{ color: colorForText }}>
                stationRegion
              </InputLabel>
              <Select
                labelId="stationRegion"
                onChange={changeHandler}
                value={
                  stationRegion ||
                  (stationCountry && regions[stationCountry][0])
                }
                name="stationRegion"
                disabled={!stationCountry}
                sx={SelectHalfStyles}
                variant="filled"
              >
                {stationCountry &&
                  regions[stationCountry].map((el: string, idx: number) => {
                    return (
                      <MenuItem value={el} key={idx}>
                        {el}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* <Button sx={ButtonStyles}>Submit</Button> */}
      </Grid>
    </>
  );
};

export default CreateStation;
