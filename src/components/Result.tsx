import React from "react";
import { resultProps, currencyProps } from "./types";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  max-height: 9rem;
  flex-direction: column;
`;

const LabelStyled = styled.label`
  font-weight: 700;
  color: #b84042;
  margin-bottom: 0.5rem;
`;

const LabelResult = styled(LabelStyled)`
  font-size: 200%;
  margin-bottom: 2rem;
`;

const LabelRate = styled(LabelStyled)`
  font-weight: 600;
  font-size: 80%;
  color: #752a2b;
  margin: 0;
`;

const Result: React.FC<resultProps> = (props) => {
  const code2mid: Record<string, string> = {};
  props.rates.forEach((currency: currencyProps) => {
    code2mid[currency.code] = currency.mid;
  });

  const codeFrom = props.fromCurrency.slice(0, 3);
  const codeTo = props.toCurrency.slice(0, 3);
  const rate = Number(code2mid[codeFrom]) / Number(code2mid[codeTo]);
  const outputValue = String(
    Math.round(rate * Number(props.value) * 100) / 100
  );

  return (
    <Container>
      <LabelStyled>
        {String(props.value) + " " + props.fromCurrency.slice(0, 3) + " = "}
      </LabelStyled>

      <LabelResult>
        {outputValue + " " + props.toCurrency.slice(0, 3)}
      </LabelResult>

      <LabelRate>
        {"1 " +
          props.fromCurrency.slice(0, 3) +
          " = " +
          Math.round(rate) +
          props.toCurrency.slice(0, 3)}
      </LabelRate>

      <LabelRate>
        {"1 " +
          props.toCurrency.slice(0, 3) +
          " = " +
          Math.round(100 / rate) / 100 +
          props.fromCurrency.slice(0, 3)}
      </LabelRate>
    </Container>
  );
};

export default Result;
