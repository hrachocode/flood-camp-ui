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
}

const CreateStation: React.FC<ICreateStation> = ({
  form: { dateOfExplotation, region, country, energyType },
  changeHandler,
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
          value={energyType}
          name={"energyType"}
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
        <TextField label="Station name" variant="filled" sx={TextStyles} />
        <TextField label="Station placement" variant="filled" sx={TextStyles} />
        <TextField
          label=" Support to station from government"
          variant="filled"
          sx={TextStyles}
        />
        <InputLabel sx={{ color: colorForText }}>
          Date of start exploitation
        </InputLabel>
        <TextField
          type="date"
          value={dateOfExplotation}
          sx={DatePickerStyles}
          name="dateOfExplotation"
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
              <InputLabel id="country" sx={{ color: colorForText }}>
                Country
              </InputLabel>

              <Select
                labelId="country"
                value={country}
                name="country"
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
              <InputLabel id="region" sx={{ color: "#fff" }}>
                Region
              </InputLabel>

              <Select
                labelId="region"
                onChange={changeHandler}
                value={region || (country && regions[country][0])}
                name="region"
                disabled={!country}
                sx={SelectHalfStyles}
                variant="filled"
              >
                {country &&
                  regions[country].map((el: string, idx: number) => {
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
