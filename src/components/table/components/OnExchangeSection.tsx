import { ToggleButton } from "@mui/material";
import { SxProps } from "@mui/system";
import React, { useState } from "react";
import { colorForText } from "../../form-steps/create-station/createStation.styles";

import { IEAC } from "../ListOfEacs";
import ExchangeModal from "./ExchangeModal";

export interface IOnExchangeSection {
  item: IEAC;
}

export const SToggleBtn: SxProps = {
  "&[aria-pressed='true']:not(:disabled)": {
    color: colorForText,
  },
};

const OnExchangeSection: React.FC<IOnExchangeSection> = ({ item }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(item.isAsk);

  return (
    <>
      <ToggleButton
        value={item.id}
        selected={checked}
        onChange={() => setIsOpen(true)}
        sx={SToggleBtn}
      >
        On Exchange
      </ToggleButton>
      <ExchangeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setChecked={setChecked}
        value={item.id}
        type={item.isAsk}
        price={item.price}
      />
    </>
  );
};

export default OnExchangeSection;
