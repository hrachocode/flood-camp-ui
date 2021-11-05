import { Grid, TextField } from "@mui/material";
import { IForm } from "../../../pages/dashboard/Dashboard";
import Title from "../../texts/Title";
import { TextStyles } from "../create-station/createStation.styles";

interface ICreateCompanyProps
  extends Pick<IForm, "companyName" | "companyRegisterNumber"> {
  changeHandler: (e: any) => void;
  error: any;
}

const CreateCompany: React.FC<ICreateCompanyProps> = ({
  companyName,
  companyRegisterNumber,
  changeHandler,
  error,
}) => {
  return (
    <>
      <Title text="Create Company" />
      <Grid container direction="column" gap={3}>
        <TextField
          error={error.companyName}
          label={"Company Name"}
          sx={TextStyles}
          name={"companyName"}
          onChange={changeHandler}
          value={companyName || ""}
        />
        <TextField
          label={"Company Register Number"}
          error={error.companyRegisterNumber}
          sx={TextStyles}
          onChange={changeHandler}
          name={"companyRegisterNumber"}
          value={companyRegisterNumber}
        />
      </Grid>
    </>
  );
};

export default CreateCompany;
