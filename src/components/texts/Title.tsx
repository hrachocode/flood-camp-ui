import { Typography } from "@mui/material";
import { TitleStyles } from "../form-steps/create-station/createStation.styles";

interface ITitle {
  text: string;
}

const Title: React.FC<ITitle> = ({ text }) => (
  <Typography variant="h4" sx={TitleStyles}>
    {text}
  </Typography>
);

export default Title;
