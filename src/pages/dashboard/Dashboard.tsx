import {
  Button,
  Container,
  Grid,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useEffect, useState } from "react";
import CreateCompany from "../../components/form-steps/create-company/CreateCompnay";
import CreateEAC from "../../components/form-steps/create-EAC/CreateEAC";
import {
  countries,
  energyTypes,
  regions,
} from "../../components/form-steps/create-station/ceateStation.utils";
import CreateStation from "../../components/form-steps/create-station/CreateStation";
import {
  MainContainerStyles,
  MainGridStyles,
  MainInnerContainer,
  StepperStyles,
} from "./dashboard.styles";

interface ISignature {
  [x: string]: string | number;
}

export interface IForm extends ISignature {
  companyName: string;
  companyRegisterNumber: string;
  stationEnergyType: string;
  stationName: string;
  stationPlacement: string;
  stationSupport: string;
  stationDateOfExplotation: string;
  stationCountry: string;
  stationRegion: string;
  eacStartDateOfCreation: string;
  eacEndDateOfCreation: string;
  eacAmountOfMwt: number;
}

const today = new Date().toISOString().split("T")[0];

const initialState: IForm = {
  companyName: "",
  companyRegisterNumber: "",
  stationDateOfExplotation: today,
  stationEnergyType: energyTypes[0],
  stationCountry: countries[0],
  stationRegion: regions[countries[0]][0],
  stationName: "",
  stationPlacement: "",
  stationSupport: "",
  eacStartDateOfCreation: today,
  eacEndDateOfCreation: today,
  eacAmountOfMwt: 0,
};

const stepLabels: string[] = ["Create Company", "Create Station", "Create EAC"];

const Dashboard: React.FC = () => {
  const [form, setForm] = useState<IForm>(initialState);
  const [error, setError] = useState<any>({});
  const [activeStep, setActiveStep] = useState<number>(0);

  const changeHandler = (e: SelectChangeEvent<string>): void =>
    void setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitForm = () => {
    console.log("submitted");
  };

  const notValidState = (value: string | number): boolean =>
    value === 0 || value === "";

  const handleNext = (): void => {
    if (activeStep === stepLabels.length - 1) {
      submitForm();
      return;
    }

    const notValidValues = Object.keys(form)
      .filter((i) => {
        return i.includes(stepLabels[activeStep].split(" ")[1].toLowerCase());
      })
      .reduce((acc: any, i: string) => {
        notValidState(form[i]) &&
          setError((prev: any) => ({ ...prev, [i]: true }));

        return [...acc, form[i]];
      }, [])
      .filter((i) => !i);

    if (!notValidValues.length)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isLastStep: boolean = activeStep === stepLabels.length - 1;
  const findContent = (index: number): JSX.Element | undefined => {
    switch (index) {
      case 0:
        return (
          <CreateCompany
            companyName={form.companyName}
            companyRegisterNumber={form.companyRegisterNumber}
            changeHandler={changeHandler}
            error={error}
          />
        );
      case 1:
        return (
          <CreateStation
            form={form}
            changeHandler={changeHandler}
            error={error}
          />
        );
      case 2:
        return (
          <CreateEAC
            eacStartDateOfCreation={form?.eacStartDateOfCreation}
            eacEndDateOfCreation={form?.eacEndDateOfCreation}
            changeHandler={changeHandler}
          />
        );
      default:
        break;
    }
  };

  useEffect(() => {
    const keys: string[] = Object.keys(error);
    if (keys.length) {
      keys.forEach((i) => {
        !notValidState(form[i]) &&
          setError((prev: any) => {
            delete prev[i];
            return prev;
          });
      });
    }
  }, [error, form]);

  return (
    <Container sx={MainContainerStyles}>
      <Grid
        container
        sx={MainGridStyles}
        justifyContent="center"
        alignItems="center"
      >
        <Stepper activeStep={activeStep} sx={StepperStyles}>
          {stepLabels.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Grid
          container
          sx={MainInnerContainer}
          direction="column"
          justifyContent="space-between"
        >
          <Grid container>{findContent(activeStep)}</Grid>
          <Grid container justifyContent="space-between">
            <Button onClick={handleBack} disabled={activeStep === 0}>
              Previous
            </Button>
            <Button onClick={handleNext}>
              {!isLastStep ? "Next" : "Finish"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
