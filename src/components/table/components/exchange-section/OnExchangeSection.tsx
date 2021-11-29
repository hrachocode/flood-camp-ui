import { ToggleButton } from "@mui/material";
import { SxProps } from "@mui/system";
import React, { useState } from "react";
import { colorForText } from "../../../form-steps/create-station/createStation.styles";

import { IEAC } from "../../ListOfEacs";
import ExchangeModal from "./ExchangeModal";

export interface IOnExchangeSection {
  item: IEAC;
}

export const SToggleBtn: SxProps = {
  "&[aria-pressed='true']": {
    color: colorForText,
  },
};

const OnExchangeSection: React.FC<IOnExchangeSection> = ({ item }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <ToggleButton
        value={item.id}
        selected={item.isAsk}
        onChange={() => setIsOpen(true)}
        sx={SToggleBtn}
        disabled={item.isArchive}
      >
        {item.isArchive ? "Archivated" : "On Exchange"}
      </ToggleButton>
      <ExchangeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        value={item.id}
        type={item.isAsk}
        price={item.price}
      />
    </>
  );
};

export default OnExchangeSection;
