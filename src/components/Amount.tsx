import React from "react";
import { amountProps } from "../utils/types";
import { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 90%;
  border: solid 0.13rem #b51618;
  border-radius: 0.3rem;
  height: 2.25rem;
  margin-top: 4%;
`;

const Amount: React.FC<amountProps> = (props) => {
  const [actualAmount, setActualAmount] = useState<Number>(
    props.defaultInputValue
  );

  return (
    <StyledInput
      type="number"
      onKeyDown={(evt) =>
        ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()
      }
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
