import { SxProps } from "@mui/system";
import { colorForText } from "../form-steps/create-station/createStation.styles";

export const NavbarMainStyle: SxProps = {
  height: "60px",
  backgroundColor: "rgba(0,0,0,0.4)",
  padding: "0 20px",
  flexDirection: "row",
  justifyContent: "space-between",
};

export const NavbarLinksWrapper: SxProps = {
  height: "100%",

  a: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    color: colorForText,
    textDecoration: "none",
    padding: "0 15px",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.1)",
    },
  },
};
