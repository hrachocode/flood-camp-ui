import { Box } from "@mui/material";
import { WrapperStyles } from "./mainWrapper.styles";

const MainWrapper: React.FC = ({ children }) => {
  return <Box sx={WrapperStyles}>{children}</Box>;
};

export default MainWrapper;
