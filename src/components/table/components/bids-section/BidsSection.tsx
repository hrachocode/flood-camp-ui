import { ToggleButton } from "@mui/material";
import { useState } from "react";
import { IEAC } from "../../ListOfEacs";
import { SToggleBtn } from "../OnExchangeSection";
import BidsModal from "./BidsModal";

interface IBidSection {
  item: IEAC;
}

const BidsSection: React.FC<IBidSection> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ToggleButton
        value={item.id}
        onChange={() => setIsOpen(true)}
        selected={true}
        disabled={!item.isAsk}
        sx={SToggleBtn}
      >
        Bids
      </ToggleButton>
      <BidsModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default BidsSection;
