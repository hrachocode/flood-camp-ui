import { ToggleButton } from "@mui/material";
import { SxProps } from "@mui/system";
import { useState } from "react";
import { colorForText } from "../../../form-steps/create-station/createStation.styles";
import { IEAC, VariantOfEACsType } from "../../ListOfEacs";
import { SToggleBtn } from "../exchange-section/OnExchangeSection";
import BidsModal from "./BidsModal";

interface IBidSection {
  item: IEAC;
  variant: VariantOfEACsType;
}

const SToggleBtnWithDisable: SxProps = {
  "&[aria-pressed='true']:not(:disabled)": {
    color: colorForText,
  },
};

const BidsSection: React.FC<IBidSection> = ({ item, variant }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ToggleButton
        value={item.id}
        onChange={() => setIsOpen(true)}
        selected={true}
        disabled={item.isArchive || !item.isAsk}
        sx={variant === "allEACs" ? SToggleBtn : SToggleBtnWithDisable}
      >
        {item.isArchive && variant === "allEACs" ? "Archivated" : "Bids"}
      </ToggleButton>
      <BidsModal
        id={item.id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        variant={variant}
      />
    </>
  );
};

export default BidsSection;
