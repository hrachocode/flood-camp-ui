import { Container } from "@mui/material";
import { MainContainerStyles } from "../../pages/dashboard/dashboard.styles";
import MainWrapper from "../main-wrapper/MainWrapper";
import Navbar from "../navbar/Navbar";

const DashboardWrapper: React.FC = ({ children }) => {
  return (
    <MainWrapper>
      <Container sx={MainContainerStyles}>
        <Navbar />
        {children}
      </Container>
    </MainWrapper>
  );
};

export default DashboardWrapper;
