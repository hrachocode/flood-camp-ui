import { Grid, TextField, Button, CircularProgress } from "@mui/material";
import Dashboard, { ISignature } from "../../../pages/dashboard/Dashboard";
import Title from "../../texts/Title";
import { TextStyles } from "../create-station/createStation.styles";
import { ChangeEvent, useState } from "react";
import { postCreateCompany } from "../../../config/api/api.service";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../../error-message/ErrorMessage";
import { responseHandler } from "../../../config/api/utils";

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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);

  const history = useHistory();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  async function submitForm() {
    setLoading(true);
    try {
      const data = await postCreateCompany({
        name: form.companyName,
        registerNumber: form.companyRegisterNumber,
      });
      setLoading(false);
      responseHandler(data, "create-station", history);
    } catch (e: any) {
      setErrorMsg(e.data.message);
      setLoading(false);
    }
  }

  return (
    <Dashboard>
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
      <ErrorMessage message={errorMsg} />
      <Grid container justifyContent="flex-end" sx={{ marginTop: "15px" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button sx={{ border: "1px solid " }} onClick={submitForm}>
            Submit
          </Button>
        )}
      </Grid>
    </Dashboard>
  );
};

export default CreateCompany;
