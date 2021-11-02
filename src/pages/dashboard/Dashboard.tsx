import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MainWrapper from "../../components/main-wrapper/MainWrapper";
import {
  ButtonStyles,
  colorForText,
  DatePickerStyles,
  MainContainerStyles,
  MainGridStyles,
  MainInnerContainer,
  SelectHalfStyles,
  SelectStyles,
  TextStyles,
  TitleStyles,
} from "./dashboard.styles";
import { countries, energyTypes, regions } from "./dashboard.utils";

const Dashboard: React.FC = () => {
  const today = new Date();
  const [energyType, setEnergyType] = useState<string>(energyTypes[0]);
  const [country, setCountry] = useState<string>();
  const [region, setRegion] = useState<any>();
  const [date, setDate] = useState<string>(today.toISOString().split("T")[0]);
  const changeHandler = (e: SelectChangeEvent<string>) => {
    switch (e.target.name) {
      case "energyType": {
        return setEnergyType(e.target.value);
      }
      case "countries": {
        return setCountry(e.target.value);
      }
      case "regions": {
        return setRegion(e.target.value);
      }
      case "datePicker": {
        return setDate(e.target.value);
      }
      default:
        break;
    }
  };
  return (
    <MainWrapper>
      <Container sx={MainContainerStyles}>
        <Grid
          container
          sx={MainGridStyles}
          justifyContent="center"
          alignItems="center"
        >
          <Grid container sx={MainInnerContainer} direction="column">
            <Typography variant="h4" sx={TitleStyles}>
              Create Station
            </Typography>
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
              <TextField
                label="Station name"
                variant="filled"
                sx={TextStyles}
              />
              <TextField
                label="Station placement"
                variant="filled"
                sx={TextStyles}
              />
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
                value={date}
                sx={DatePickerStyles}
                name="datePicker"
                inputProps={{
                  max: today.toISOString().split("T")[0],
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e: any) => setDate(e.target.value)}
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
                      name="countries"
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
                      value={region}
                      name="regions"
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
              <Button sx={ButtonStyles}>Submit</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MainWrapper>
  );
};

export default Dashboard;
