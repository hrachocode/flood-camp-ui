import React, { ChangeEvent } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  SelectChangeEvent,
  CircularProgress,
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
import Dashboard, { ISignature } from "../../../pages/dashboard/Dashboard";
import { useState } from "react";
import { postCreateStation } from "../../../config/api/api.service";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../../error-message/ErrorMessage";
import { responseHandler } from "../../../config/api/utils";

interface IForm extends ISignature {
  stationEnergyType: string;
  stationName: string;
  stationPlacement: string;
  stationSupport: string;
  stationDateOfExplotation: string;
  stationCountry: string;
  stationRegion: string;
}

const today = new Date().toISOString().split("T")[0];

const initialState: IForm = {
  stationDateOfExplotation: today,
  stationEnergyType: energyTypes[0],
  stationCountry: countries[0].value,
  stationRegion: regions[countries[0].value][0].id,
  stationName: "",
  stationPlacement: "",
  stationSupport: "",
};

const CreateStation: React.FC = () => {
  const today = new Date();

  const [form, setForm] = useState<IForm>(initialState);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);

  const history = useHistory();

  const changeHandler = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ): void =>
    setForm((prev) => {
      if (e.target.name === "stationCountry") {
        prev.stationRegion = regions[e.target.value][0].id;
      }
      return { ...prev, [e.target.name]: e.target.value };
    });

  async function submitForm() {
    setLoading(true);

    const finded = countries.find((i) => i.value === form.stationCountry);

    if (finded) {
      setLoading(true);
      try {
        const data = await postCreateStation({
          name: form.stationName,
          placement: form.stationPlacement,
          stationEnergyType: form.stationEnergyType,
          supportGovernment: form.stationSupport,
          exploitationStart: new Date(form.stationDateOfExplotation),
          countryId: finded.id,
          regionId: form.stationRegion,
        });
        responseHandler(data, "create-eac", history);
        setLoading(false);
      } catch (e: any) {
        setErrorMsg(e.data.message);
        setLoading(false);
      }
    }
  }

  return (
    <Dashboard>
      <Title text="Create Station" />
      <Grid container sx={{ gap: 2 }} direction={"column"}>
        <InputLabel id="energySelect" sx={{ color: colorForText }}>
          Type of energy
        </InputLabel>

        <Select
          labelId="energySelect"
          value={form.stationEnergyType}
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
          value={form.stationName}
          onChange={changeHandler}
          name="stationName"
        />
        <TextField
          label="Station placement"
          variant="filled"
          sx={TextStyles}
          value={form.stationPlacement}
          onChange={changeHandler}
          name="stationPlacement"
        />
        <TextField
          label=" Support to station from government"
          variant="filled"
          sx={TextStyles}
          value={form.stationSupport}
          name="stationSupport"
          onChange={changeHandler}
        />
        <InputLabel sx={{ color: colorForText }}>
          Date of start exploitation
        </InputLabel>
        <TextField
          type="date"
          value={form.stationDateOfExplotation}
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
                Station Country
              </InputLabel>

              <Select
                labelId="stationCountry"
                value={form.stationCountry}
                name="stationCountry"
                onChange={changeHandler}
                sx={SelectHalfStyles}
                variant="filled"
              >
                {countries.map((el) => {
                  return (
                    <MenuItem value={el.value} key={el.id}>
                      {el.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="stationRegion" sx={{ color: colorForText }}>
                Station Region
              </InputLabel>
              <Select
                labelId="stationRegion"
                onChange={changeHandler}
                value={form.stationRegion}
                name="stationRegion"
                disabled={!form.stationCountry}
                sx={SelectHalfStyles}
                variant="filled"
              >
                {form.stationCountry &&
                  regions[form.stationCountry].map((el: any, idx: number) => {
                    return (
                      <MenuItem value={el.id} key={idx}>
                        {el.value}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
          <ErrorMessage message={errorMsg} />
        </Grid>
        <Grid container justifyContent="flex-end" sx={{ marginTop: "15px" }}>
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

export default CreateStation;
