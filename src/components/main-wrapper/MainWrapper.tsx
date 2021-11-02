import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import windTurbins from "./assets/wind-turbins.png";

const WrapperStyles: SxProps = {
  height: "100%",
  minHeight: "100vh",
  width: "100%",
  backgroundImage: `url(${windTurbins})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: "rgba(0, 0, 0, 0.6)",
    boxShadow: "inset 0 0 500px rgb(0, 0, 0)",
  },
};

const MainWrapper: React.FC = ({ children }) => {
  return <Box sx={WrapperStyles}>{children}</Box>;
};

export default MainWrapper;
