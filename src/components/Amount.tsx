import React from "react";
import { amountProps } from "./types";
import { useState } from "react";

const Amount: React.FC<amountProps> = (props) => {
  const [actualAmount, setActualAmount] = useState<Number>(0);

  return (
    <input
      type="number"
      onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}
      value={String(actualAmount)}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        const actualInput = event.currentTarget.value;
        const roundedNumber = Math.round(Number(actualInput) * 100) / 100;
        props.onChangeValue(roundedNumber);
        setActualAmount(roundedNumber);
      }}
    />
  );
};

export default Amount;
