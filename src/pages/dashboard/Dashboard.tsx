import {
  Button,
  Container,
  Grid,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { useState } from "react";
import CreateCompany from "../../components/form-steps/create-company/CreateCompnay";
import CreateEAC from "../../components/form-steps/create-EAC/CreateEAC";
import {
  countries,
  energyTypes,
} from "../../components/form-steps/create-station/ceateStation.utils";
import CreateStation from "../../components/form-steps/create-station/CreateStation";
import {
  MainContainerStyles,
  MainGridStyles,
  MainInnerContainer,
  StepperStyles,
} from "./dashboard.styles";

export interface IForm {
  region: string;
  dateOfExplotation: string;
  energyType: string;
  changeHandler: any;
  country: string;
  startDateOfCreation: string;
  endDateOfCreation: string;
}

const Dashboard: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState<IForm | Partial<IForm>>({
    dateOfExplotation: today,
    energyType: energyTypes[0],
    country: countries[0],
    startDateOfCreation: today,
    endDateOfCreation: today,
  });
  const [activeStep, setActiveStep] = useState<number>(0);

  const changeHandler = (e: SelectChangeEvent<string>): void =>
    void setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitForm = () => {
    console.log("submitted");
  };

  const handleNext = (): void => {
    if (activeStep === stepLabels.length - 1) {
      submitForm();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const stepLabels: string[] = [
    "Create Station",
    "Create Company",
    "Create EAC",
  ];
  const isLastStep: boolean = activeStep === stepLabels.length - 1;
  const findContent = (index: number): JSX.Element | undefined => {
    switch (index) {
      case 0:
        return <CreateStation form={form} changeHandler={changeHandler} />;
      case 1:
        return <CreateCompany />;
      case 2:
        return (
          <CreateEAC
            startDateOfCreation={form?.startDateOfCreation}
            endDateOfCreation={form?.endDateOfCreation}
            changeHandler={changeHandler}
          />
        );
      default:
        break;
    }
  };

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
