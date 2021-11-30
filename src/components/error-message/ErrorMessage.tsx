import { Box } from "@mui/material";

interface IerrorMessage {
  message: Array<string>;
}

const ErrorMessage: React.FC<IerrorMessage> = ({ message }) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      color="red"
    >
      {message.map((el: string) => {
        return <span key={el}>{el}</span>;
      })}
    </Box>
  );
};

export default ErrorMessage;
