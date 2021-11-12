import { Grid, TextField, Button } from "@mui/material";
import { ISignature } from "../../../pages/dashboard/Dashboard";
import Title from "../../texts/Title";
import { TextStyles } from "../create-station/createStation.styles";
import { ChangeEvent, useState } from "react";
import { postCreateCompany } from "../../../config/api/api.service";

interface IForm extends ISignature {
  companyName: string;
  companyRegisterNumber: string;
}

const initialState: IForm = {
  companyName: "",
  companyRegisterNumber: "",
};

const CreateCompany: React.FC = () => {
  const [form, setForm] = useState<IForm>(initialState);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void =>
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

  async function submitForm() {
    console.log(form);
    await postCreateCompany({
      name: form.companyName,
      registerNumber: form.companyRegisterNumber,
    });
  }

  return (
    <>
      <Title text="Create Company" />
      <Grid container direction="column" gap={3}>
        <TextField
          label={"Company Name"}
          sx={TextStyles}
          name={"companyName"}
          onChange={changeHandler}
          value={form.companyName}
        />
        <TextField
          label={"Company Register Number"}
          sx={TextStyles}
          onChange={changeHandler}
          name={"companyRegisterNumber"}
          value={form.companyRegisterNumber}
        />
      </Grid>
      <Grid container justifyContent="flex-end" sx={{ marginTop: "15px" }}>
        <Button onClick={submitForm}>Submit</Button>
      </Grid>
    </>
  );
};

export default CreateCompany;
