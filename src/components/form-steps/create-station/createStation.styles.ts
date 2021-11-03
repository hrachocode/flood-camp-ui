import { SxProps } from "@mui/system";

export const colorForInputs = "#2D3352";
export const colorForText = "#E9EFF9";

export const MainContainerStyles: SxProps = {
  width: "100%",
  height: "100%",
};

export const MainGridStyles: SxProps = {
  height: " 100%",
  width: "100%",
  minHeight: "100vh",
};

export const MainInnerContainer: SxProps = {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: "20px",
};

export const SelectStyles: SxProps = {
  backgroundColor: colorForInputs,
  color: colorForText,
};

export const TextStyles: SxProps = {
  backgroundColor: colorForInputs,
  color: colorForText,
  label: { color: colorForText },
  input: { color: colorForText },
};

export const DatePickerStyles: SxProps = {
  backgroundColor: colorForInputs,
  width: 220,
  label: { color: colorForText },
  input: { color: colorForText },
};

export const SelectHalfStyles: SxProps = {
  ...SelectStyles,
  width: "50%",
};

export const ButtonStyles: SxProps = {
  width: 256,
  background: colorForInputs,
  color: colorForText,
};

export const TitleStyles: SxProps = {
  color: colorForText,
  marginBottom: 3,
};
