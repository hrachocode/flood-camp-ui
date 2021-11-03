import { Grid, TextField } from "@mui/material";
import Title from "../../texts/Title";
import { TextStyles } from "../create-station/createStation.styles";

const CreateCompany = () => {
  return (
    <>
      <Title text="Create Company" />
      <Grid container direction="column" gap={3}>
        <TextField label={"Company Name"} sx={TextStyles} />
        <TextField label={"Company Register Number"} sx={TextStyles} />
      </Grid>
    </>
  );
};

export default CreateCompany;
