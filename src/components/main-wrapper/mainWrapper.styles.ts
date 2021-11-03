import { SxProps } from "@mui/system";
import windTurbins from "./assets/wind-turbins.png";

export const WrapperStyles: SxProps = {
  height: "100%",
  minHeight: "100vh",
  width: "100%",
  backgroundImage: `url(${windTurbins})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
